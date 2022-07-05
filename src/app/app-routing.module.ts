import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAboutMeComponent } from './components/about-me/edit-about-me/edit-about-me.component';
import { AddBannerComponent } from './components/banner/add-banner/add-banner.component';
import { EditBannerComponent } from './components/banner/edit-banner/edit-banner.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { LoginComponent } from './components/login/login.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { GuardService as guard } from './services/guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sobre-mi/editar', component: EditAboutMeComponent, canActivate: [guard], data: {expectedRol: ['admin'] }},
  {path: 'banner/agregar', component: AddBannerComponent, canActivate: [guard], data: {expectedRol: ['admin'] }},
  {path: 'banner/editar', component: EditBannerComponent, canActivate: [guard], data: {expectedRol: ['admin'] }},
  {path: 'experiencia/agregar', component: AddExperienceComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'experiencia/editar/:id', component: EditExperienceComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'educacion/agregar', component: AddEducationComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'educacion/editar/:id', component: EditEducationComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'habilidad/agregar', component: AddSkillComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'habilidad/editar/:id', component: EditSkillComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'proyecto/agregar', component: AddProjectComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'proyecto/editar/:id', component: EditProjectComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
