import { environment } from '../../../environments/environment'
import {
    createClient,
    SupabaseClient,
} from './../../../../node_modules/@supabase/supabase-js/src/index'
import { Injectable } from '@angular/core'

// Al estar a nivel de root este servicio se comporta como un Singleton
// Luego de haber creado una instancia siempre retorna dicha instancia ya creada.
@Injectable({ providedIn: 'root' })
export class SupabaseService {
    supabaseClient: SupabaseClient

    constructor() {
        this.supabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
    }
}
