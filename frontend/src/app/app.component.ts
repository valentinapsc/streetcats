import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NotificationComponent],
  template: `
    <app-navbar></app-navbar>
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'streetcats';
}
