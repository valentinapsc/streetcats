// src/app/pages/cat-detail/cat-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatService, Cat } from '../../services/cat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.scss']
})
export class CatDetailComponent implements OnInit {
  cat: Cat | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private catService: CatService) {}

  ngOnInit(): void {
    // Recupera l'ID dall'URL e converti in numero
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.catService.getCatById(id).subscribe({
        next: (data) => {
          this.cat = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Errore nel caricamento dei dettagli del gatto.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID non valido';
      this.isLoading = false;
    }
  }
}