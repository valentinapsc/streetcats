import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatDetailComponent } from './pages/cat-detail/cat-detail.component';
import { SubmitCatComponent } from './pages/submit-cat/submit-cat.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cat/:id', component: CatDetailComponent },
  { path: 'submit', component: SubmitCatComponent },
];