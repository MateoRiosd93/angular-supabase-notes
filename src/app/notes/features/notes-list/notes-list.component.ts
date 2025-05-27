import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  imports: [],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export default class NotesListComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  async logOut(){
    await this.authService.signOut()
    this.router.navigateByUrl('/auth/log-in')
  }
}
