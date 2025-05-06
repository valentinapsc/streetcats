// edit-cat.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';

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

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private catService: CatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.catService.getCatById(this.id).subscribe(cat => {
      this.catForm = this.fb.group({
        name: [cat.name, Validators.required],
        description: [cat.description, Validators.required]
      });
    });
  }

  onSubmit(): void {
    if (this.catForm.invalid) return;
    this.catService.updateCat(this.id, this.catForm.value).subscribe(() => {
      this.router.navigate(['/cat', this.id]);
    });
  }
}