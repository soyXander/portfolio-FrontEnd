import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import {
  faPen,
  faPlus,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ExperienceService } from 'src/app/services/experience.service';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  navSubscription: any;

  // Iconos
  faPen = faPen;
  faPlus = faPlus;
  faStar = faStar;
  faXmark = faXmark;

  experiences: Experience[] = [];
  isLoggedIn: boolean;
  isAdmin: boolean;
  roles: string[] = [];

  constructor(
    private expService: ExperienceService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private iziToast: Ng2IzitoastService
    ) {
      this.navSubscription = this.router.events.subscribe((evt: any) => {
        if (evt instanceof NavigationEnd) {
          this.loadExp();
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
    //this.loadExp();
  }

  loadExp(): void {
    this.expService.list().subscribe(
      data => {
        this.experiences = data;
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
    this.expService.delete(id).subscribe(
      data => {
        this.iziToast.info({
          title: 'Experiencia eliminada',
          message: data.message,
          position: 'bottomRight'
        });
        this.loadExp();
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
