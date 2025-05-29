import { AfterViewInit, Component, inject } from '@angular/core'
import { AuthService } from '../../../auth/data-access/auth.service'
import { Router } from '@angular/router'
import { Note, NotesService } from '../../data-access/notes.service'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { getUserIdLocalStorage } from '../../../shared/storage/local-storage'

interface NoteForm {
    title: FormControl<string | null>
    description: FormControl<string | null>
}

@Component({
    selector: 'app-notes-list',
    imports: [ReactiveFormsModule],
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.css',
})
export default class NotesListComponent implements AfterViewInit {
    private readonly authService = inject(AuthService)
    private readonly router = inject(Router)
    notesService = inject(NotesService)

    private readonly formBuilder = inject(FormBuilder)

    form = this.formBuilder.group<NoteForm>({
        title: this.formBuilder.control(null, [Validators.required]),
        description: this.formBuilder.control(null),
    })

    ngAfterViewInit() {
        this.notesService.getAllNotes()
    }

    async logOut() {
        await this.authService.signOut()
        this.router.navigateByUrl('/auth/log-in')
    }

    save(){
        if(this.form.invalid) return

        const newNote: Note = {
            id: (this.notesService.notes().length + 1).toString(),
            title: this.form.value.title as string,
            description: this.form.value.description as string,
            user_id: getUserIdLocalStorage() as string 
        }

        this.notesService.saveNote(newNote)

        this.form.reset()
    }
}
