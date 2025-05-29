import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../data-access/auth.service'
import { setUserIdLocalStorage } from '../../../shared/storage/local-storage'

interface LogInForm {
    email: FormControl<null | string>
    password: FormControl<null | string>
}

@Component({
    selector: 'app-auth-log-in',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './auth-log-in.component.html',
    styleUrl: './auth-log-in.component.css',
})
export default class AuthLogInComponent {
    private readonly formBuilder = inject(FormBuilder)
    private readonly authService = inject(AuthService)
    private readonly router = inject(Router)

    form = this.formBuilder.group<LogInForm>({
        email: this.formBuilder.control(null, [Validators.required, Validators.email]),
        password: this.formBuilder.control(null, [Validators.required]),
    })

    async submit() {
        if (this.form.invalid) return

        try {
            const { data: { user }, error } = await this.authService.logIn({
                email: this.form.value.email ?? '',
                password: this.form.value.password ?? '',
            })

            if (error) throw error

            if (user) setUserIdLocalStorage(user.id)

            this.router.navigateByUrl('/')
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
            }
        }
    }
}
