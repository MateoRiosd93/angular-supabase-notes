import { inject, Injectable } from '@angular/core'
import { SupabaseService } from '../../shared/data-access/supabase.service'
import {
    SignInWithPasswordCredentials,
    SignUpWithPasswordCredentials,
} from '@supabase/supabase-js/src'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly supabaseClient = inject(SupabaseService).supabaseClient

    session() {
        return this.supabaseClient.auth.getSession();
    }

    signUp(credentials: SignUpWithPasswordCredentials) {
        return this.supabaseClient.auth.signUp(credentials)
    }

    logIn(credentials: SignInWithPasswordCredentials) {
        return this.supabaseClient.auth.signInWithPassword(credentials)
    }

    signOut() {
        return this.supabaseClient.auth.signOut()
    }
}
