import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../data-access/auth.service'

interface SignUpForm {
    email: FormControl<null | string>
    password: FormControl<null | string>
}

@Component({
    selector: 'app-auth-sign-up',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './auth-sign-up.component.html',
    styleUrl: './auth-sign-up.component.css',
})
export default class AuthSignUpComponent {
    private formBuilder = inject(FormBuilder)
    private authService = inject(AuthService)

    form = this.formBuilder.group<SignUpForm>({
        email: this.formBuilder.control(null, [Validators.required, Validators.email]),
        password: this.formBuilder.control(null, [Validators.required]),
    })

    async submit() {
        if (this.form.invalid) return

        const authResponse = await this.authService.signUp({
            email: this.form.value.email ?? '',
            password: this.form.value.password ?? '',
        })

        console.log(authResponse)
    }
}
