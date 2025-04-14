import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  showModal = false;
  isLoginMode = true; // true = login, false = register

  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.errorMessage = '';
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    
    const loginData = this.loginForm.value;
    this.http.post<any>('http://localhost:3000/api/auth/login', loginData)
      .subscribe({
        next: (res) => {
          console.log('Login successo', res);
          // Salva il token e fai eventuale redirect o aggiornamento UI
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error.error || 'Errore durante il login';
        }
      });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    
    const registerData = this.registerForm.value;
    this.http.post<any>('http://localhost:3000/api/auth/register', registerData)
      .subscribe({
        next: (res) => {
          console.log('Registrazione riuscita', res);
          // Puoi eventualmente passare automaticamente in modalità login oppure loggare l'utente
          this.toggleMode();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error.error || 'Errore durante la registrazione';
        }
      });
  }
}