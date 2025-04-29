// descrizione: Componente per visualizzare i dettagli di un gatto specifico

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService, Cat } from '../../services/cat.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private route: ActivatedRoute, private catService: CatService, private notificationService: NotificationService, private router: Router, public authService: AuthService) {}

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

  onDeleteCat(): void {
    if (!this.cat || !this.cat.id) { return; }
    
    if (confirm('Sei sicuro di voler eliminare questo gatto?')) {
      this.catService.deleteCat(this.cat.id).subscribe({
        next: (res) => {
          this.notificationService.show('Gatto eliminato con successo');
          // Dopo l'eliminazione, ad esempio, naviga alla pagina principale o aggiorna la lista
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.notificationService.show('Errore nell\'eliminazione del gatto', 4000);
        }
      });
    }
  }

  openEditModal(): void {
    if (!this.cat) { return; }
    // Logica per aprire il modal di modifica
    this.router.navigate(['/edit-cat', this.cat.id]);
  }
}