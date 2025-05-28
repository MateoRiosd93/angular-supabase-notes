import { computed, inject, Injectable, signal } from '@angular/core'
import { SupabaseService } from '../../shared/data-access/supabase.service'

interface Note {
    id: string
    title: string
    description: string | null
    user_id: string
}

interface NotesState {
    notes: Note[]
    loading: boolean
    error: boolean
}

@Injectable({ providedIn: 'root' })
export class NotesService {
    private readonly supabaseClient = inject(SupabaseService).supabaseClient

    private readonly state = signal<NotesState>({
        notes: [],
        loading: false,
        error: false,
    })

    // Selectors (computed signals)
    notes = computed(() => this.state().notes)
    loading = computed(() => this.state().loading)
    error = computed(() => this.state().error)

    async getAllNotes() {
        // try catch debido a q all lo que retorna supabase es una promise
        try {
            const { data: notes, error } = await this.supabaseClient.from('notes').select()

            console.log(notes);
        } catch (error) {
            console.error(error)
        }
    }
}
