import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="notification">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe(msg => {
      this.message = msg;
    });
  }
}