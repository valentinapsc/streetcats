import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';

import { CatService, Cat, Comment } from '../../services/cat.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.scss']
})
export class CatDetailComponent implements OnInit {
  cat: Cat | null = null;
  htmlDescription!: SafeHtml;

  comments: Comment[] = [];
  commentCtrl: any;

  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private notify: NotificationService,
    private router: Router,
    public  authService: AuthService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.commentCtrl = this.fb.control('', Validators.required);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.errorMessage = 'ID non valido'; this.isLoading = false; return; }

    this.catService.getCatById(id).subscribe({
      next: cat => {
        this.cat = cat;
        this.htmlDescription = this.sanitizeMarkdown(cat.description);
        this.loadComments();          // carica i commenti
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento dei dettagli del gatto.';
        this.isLoading = false;
      }
    });
  }

  private sanitizeMarkdown(md: string): SafeHtml {
    const rawHtml = marked.parse(md) as string;
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  private loadComments(): void {
    if (!this.cat) return;
    this.catService.getComments(this.cat!.id!).subscribe({
      next: c => (this.comments = c),
      error: () => this.notify.show('Errore nel caricamento commenti', 3000)
    });
  }

  submitComment(): void {
    if (this.commentCtrl.invalid || !this.cat || this.cat.id === undefined) return;
    const text = this.commentCtrl.value!;
    this.catService.addComment(this.cat.id!, text).subscribe({
      next: c => {
        this.comments.unshift(c);      // aggiorna la lista subito
        this.commentCtrl.reset();
      },
      error: () => this.notify.show('Errore nell\'invio commento', 3000)
    });
  }

  onDeleteCat(): void {
    if (!this.cat || this.cat.id === undefined) return;
    if (!confirm('Sei sicuro di voler eliminare questo gatto?')) return;

    this.catService.deleteCat(this.cat.id).subscribe({
      next: () => {
        this.notify.show('Gatto eliminato con successo');
        this.router.navigate(['/']);
      },
      error: () => this.notify.show('Errore nell\'eliminazione', 4000)
    });
  }

  openEditModal(): void {
    if (this.cat) this.router.navigate(['/edit-cat', this.cat.id]);
  }
}