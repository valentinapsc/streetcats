// navbar.component.ts
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterLink,
    AuthModalComponent //IMPORTANTE
  ]
})
export class NavbarComponent {
  @ViewChild('authModal') authModal: AuthModalComponent | undefined;

  openAuthModal() {
    this.authModal?.openModal();
  }
}