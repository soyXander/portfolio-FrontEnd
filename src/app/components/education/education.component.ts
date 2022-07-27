import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faGraduationCap, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy {
  navSubscription: any;

  // Iconos
  faGraduationCap = faGraduationCap;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  educations: Education[] = [];
  apiUrl: string = environment.apiUrl;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private eduService: EducationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadEdu();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = this.tokenStorageService.isLogged();
      this.isAdmin = this.tokenStorageService.isAdmin();
    });
  }

  loadEdu(): void {
    this.eduService.list().subscribe(
      data => {
        this.educations = data;
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
    this.eduService.delete(id).subscribe(
      data => {
        this.iziToast.info({
          title: 'Educación eliminada',
          message: data.message,
          position: 'bottomRight'
        });
        this.loadEdu();
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

  ngOnDestroy() {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }
}
