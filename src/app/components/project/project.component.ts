import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBriefcase, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  navSuscription: any;

  // Iconos
  faBriefcase = faBriefcase;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  projects: Project[] = [];
  isLoggedIn: boolean;
  isAdmin: boolean;
  roles: string[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private iziToast: Ng2IzitoastService
  ) {
    this.navSuscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        this.loadProject();
      }
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        if (this.roles.includes('ADMIN')) {
          this.isAdmin = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadProject();
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
    if (this.navSuscription) {
      this.navSuscription.unsubscribe();
    }
  }
}
