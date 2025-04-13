import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { NotificationService } from '../../services/notification.service';
import { LocationPickerComponent } from '../../components/location-picker/location-picker.component';

@Component({
  selector: 'app-submit-cat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocationPickerComponent],
  templateUrl: './submit-cat.component.html',
  styleUrls: ['./submit-cat.component.scss']
})
export class SubmitCatComponent {
  catForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private catService: CatService,
    private notificationService: NotificationService
  ) {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      image: [null]
    });
  }

  updateLocation(location: { lat: number; lng: number }): void {
    this.catForm.patchValue({ lat: location.lat, lng: location.lng });
  }

  onSubmit(): void {
    if (this.catForm.valid) {
      const formData = new FormData();
      formData.append('name', this.catForm.value.name);
      formData.append('description', this.catForm.value.description);
      formData.append('lat', this.catForm.value.lat);
      formData.append('lng', this.catForm.value.lng);
      if (this.catForm.value.image) {
        formData.append('image', this.catForm.value.image);
      }
      this.catService.submitCat(formData).subscribe({
        next: response => {
          console.log('Segnalazione inviata con successo', response);
          // Visualizza una notifica di successo
          this.notificationService.show('Gatto caricato con successo');
          // Altre azioni, ad es. resettare il form
          this.catForm.reset();
        },
        error: err => {
          console.error('Errore durante l\'invio della segnalazione', err);
          this.notificationService.show('Errore nel caricamento del gatto', 4000);
        }
      });
    } else {
      console.log('Form non valido');
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.catForm.patchValue({ image: file });
    }
  }
}