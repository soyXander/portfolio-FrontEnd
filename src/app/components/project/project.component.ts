import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBriefcase, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  navSubscription: any;

  // Iconos
  faBriefcase = faBriefcase;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  projects: Project[] = [];
  apiUrl: string = environment.apiUrl;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadProject();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = this.tokenStorageService.isLogged();
      this.isAdmin = this.tokenStorageService.isAdmin();
    });
  }

  loadProject(): void {
    this.projectService.list().subscribe(
      data => {
        this.projects = data;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
      }
    );
  }

  delete(id: any): void {
    this.projectService.delete(id).subscribe(
      data => {
        this.iziToast.info({
          title: 'Info',
          message: data.message,
          position: 'bottomRight'
        });
        this.loadProject();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }
}
