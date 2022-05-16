import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'experiencia/agregar', component: AddExperienceComponent},
  {path: 'experiencia/editar/:id', component: EditExperienceComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
