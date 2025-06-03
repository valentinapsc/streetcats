import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
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
  commentForm!: FormGroup; 

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
  ) {}

  ngOnInit(): void {
    /* inizializza il form una sola volta */
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.pattern(/\S+/)]]   // almeno un non-spazio
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.errorMessage = 'ID non valido'; this.isLoading = false; return; }

    this.catService.getCatById(id).subscribe({
      next: cat => {
        this.cat = cat;
        this.htmlDescription = this.sanitizeMarkdown(cat.description);
        this.loadComments();
        this.isLoading = false;
      },
      error: () => { this.errorMessage = 'Errore nel caricamento'; this.isLoading = false; }
    });
  }

  /* ========== helper ========== */
  private sanitizeMarkdown(md: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(md) as string);
  }

  /* ========== commenti ========== */
  private loadComments(): void {
    if (!this.cat?.id) return;
    this.catService.getComments(this.cat.id).subscribe({
      next: c => (this.comments = c),
      error: () => this.notify.show('Errore nel caricamento commenti', 3000)
    });
  }

  submitComment(): void {
    if (this.commentForm.invalid || !this.cat?.id) return;

    const text = this.commentForm.value.text.trim();
    this.catService.addComment(this.cat.id, text).subscribe({
      next: c => {
        this.comments.unshift(c);        // aggiorna subito la lista
        this.commentForm.reset();        // svuota textarea
      },
      error: () => this.notify.show('Errore nell\'invio commento', 3000)
    });
  }

  /* ========== azioni gatto ========== */
  onDeleteCat(): void {
    if (!this.cat?.id) return;
    if (!confirm('Sei sicuro di voler eliminare questo gatto?')) return;

    this.catService.deleteCat(this.cat.id).subscribe({
      next: () => { this.notify.show('Gatto eliminato'); this.router.navigate(['/']); },
      error: () => this.notify.show('Errore nell\'eliminazione', 4000)
    });
  }

  openEditModal(): void {
    if (this.cat) this.router.navigate(['/edit-cat', this.cat.id]);
  }
}