import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatService, Cat } from '../../services/cat.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-cat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.scss']
})
export class EditCatComponent implements OnInit {
  catForm!: FormGroup;
  id!: number;
  initialCat!: Cat;
  previewUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private catService: CatService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.catService.getCatById(this.id).subscribe({
      next: cat => {
        this.initialCat = cat;
        this.catForm = this.fb.group({
          name:        [cat.name,        Validators.required],
          description: [cat.description, Validators.required],
          image:       [null]            // file (opzionale)
        });
        if (cat.image) {
          this.previewUrl = `http://localhost:3000/uploads/${cat.image}`;
        }
      },
      error: () => {
        this.notify.show('Gatto non trovato');
        this.router.navigate(['/']);
      }
    });
  }

  onFileChange(e: any): void {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      this.catForm.patchValue({ image: file });

      // preview veloce
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.catForm.invalid) return;

    const fd = new FormData();
    fd.append('name',        this.catForm.value.name);
    fd.append('description', this.catForm.value.description);

    const newImage: File | null = this.catForm.value.image;
    if (newImage) fd.append('image', newImage);

    this.catService.updateCat(this.id, fd).subscribe({
      next: () => {
        this.notify.show('Gatto aggiornato con successo');
        this.router.navigate(['/cat', this.id]);
      },
      error: () => this.notify.show('Errore nell’aggiornamento', 4000)
    });
  }
}