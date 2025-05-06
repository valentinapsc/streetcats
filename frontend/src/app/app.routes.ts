import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatDetailComponent } from './pages/cat-detail/cat-detail.component';
import { SubmitCatComponent } from './pages/submit-cat/submit-cat.component';
import { EditCatComponent } from './pages/edit-cat/edit-cat.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cat/:id', component: CatDetailComponent },
  { path: 'submit', component: SubmitCatComponent },
  { path: 'edit-cat/:id',
    loadComponent: () => import('./pages/edit-cat/edit-cat.component')
                        .then(m => m.EditCatComponent)
  },
  { path: '**', redirectTo: 'home' }
];