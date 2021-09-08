import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { CategoriaReadComponent } from './components/view/categoria/categoria-read/categoria-read.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias', component: CategoriaReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
