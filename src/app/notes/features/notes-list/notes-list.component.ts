import { AfterViewInit, Component, inject } from '@angular/core'
import { AuthService } from '../../../auth/data-access/auth.service'
import { Router } from '@angular/router'
import { Note, NotesService } from '../../data-access/notes.service'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { getUserIdLocalStorage } from '../../../shared/storage/local-storage'
import { uuid } from '@supabase/supabase-js/src/lib/helpers'

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

    isEditNote: boolean = false
    idNoteForEdit: string = ''

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

    saveNote() {
        if (this.form.invalid) return

        const newNote: Note = {
            id: this.idNoteForEdit || uuid(),
            title: this.form.value.title as string,
            description: this.form.value.description as string,
            user_id: getUserIdLocalStorage() as string,
        }

        this.form.reset()

        if (this.isEditNote) {
            this.notesService.editNote(newNote)
            this.isEditNote = false
            this.idNoteForEdit = ''
            return
        }

        this.notesService.saveNote(newNote)
    }

    loadNoteForEdit(note: Note) {
        this.form.patchValue({
            title: note.title,
            description: note.description,
        })

        this.isEditNote = true
        this.idNoteForEdit = note.id
    }

    deleteNote(id: string) {}
}
