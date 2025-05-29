import { computed, inject, Injectable, signal } from '@angular/core'
import { SupabaseService } from '../../shared/data-access/supabase.service'

export interface Note {
    id: string
    title: string | null
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
            this.state.update(state => ({
                ...state,
                loading: true,
            }))

            const { data: notes } = await this.supabaseClient
                .from('notes')
                .select()
                .overrideTypes<Note[]>()

            if (notes) {
                this.state.update(state => ({
                    ...state,
                    notes,
                }))
            }
        } catch (error) {
            this.state.update(state => ({
                ...state,
                error: true,
            }))

            console.error(error)
        } finally {
            this.state.update(state => ({
                ...state,
                loading: false,
            }))
        }
    }

    async saveNote(note: Note) {
        try {
            const { data, error } = await this.supabaseClient
                .from('notes')
                .insert(note)
                .select()

            if (error) throw error

            if (data) {
                this.state.update(state => ({
                    ...state,
                    notes: [...state.notes, ...data],
                }))
            }
        } catch (error) {
            this.state.update(state => ({
                ...state,
                error: true,
            }))

            console.error(error)
        }
    }

    async editNote(note: Note) {
        try {
            const { data, error } = await this.supabaseClient
                .from('notes')
                .update(note)
                .eq('id', note.id)
                .select()
            
            if (error) throw error

            const notes = this.state().notes.map(element => {
                if(element.id === note.id){
                    return {...note}
                }
                return element
            })

            if (data) {
                this.state.update(state => ({
                    ...state,
                    notes: [...notes],
                }))
            }
        } catch (error) {
            this.state.update(state => ({
                ...state,
                error: true,
            }))

            console.error(error)
        }
    }
}
