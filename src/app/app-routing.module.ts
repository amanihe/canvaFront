import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';

const routes: Routes = [
  {path: 'dossier/:id', component: DossierDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
