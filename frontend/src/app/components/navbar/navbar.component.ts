// navbar.component.ts
import { Component, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterLink,
    AuthModalComponent, //IMPORTANTE
    CommonModule
  ]
})
export class NavbarComponent {
  @ViewChild('authModal') authModal: AuthModalComponent | undefined;
  
  constructor(public auth: AuthService, private router: Router) {}
  
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
  
  openAuthModal() {
    this.authModal?.openModal();
  }
}