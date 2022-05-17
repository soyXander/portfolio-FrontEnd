import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'experiencia/agregar', component: AddExperienceComponent},
  {path: 'experiencia/editar/:id', component: EditExperienceComponent},
  {path: 'educacion/agregar', component: AddEducationComponent},
  {path: 'educacion/editar/:id', component: EditEducationComponent},
  {path: 'habilidad/agregar', component: AddSkillComponent},
  {path: 'habilidad/editar/:id', component: EditSkillComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
