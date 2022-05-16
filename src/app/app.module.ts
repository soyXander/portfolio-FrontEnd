import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { LoginComponent } from './components/login/login.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProjectsComponent } from './components/projects/projects.component';
import { Ng2IziToastModule } from 'ng2-izitoast';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AboutMeComponent,
    SidebarComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    LoginComponent,
    ProjectsComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    AddEducationComponent,
    EditEducationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgCircleProgressModule.forRoot({

    }),
    Ng2IziToastModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
