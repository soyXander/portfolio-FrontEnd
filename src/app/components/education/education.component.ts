import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faGraduationCap, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy {

  navSuscription: any;

  // Iconos
  faGraduationCap = faGraduationCap;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  educations: Education[] = [];

  constructor(
    private eduService: EducationService,
    private iziToast: Ng2IzitoastService,
    private router: Router
  ) {
    this.navSuscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        this.loadEdu();
      }
    });
  }

  ngOnInit(): void {
    this.loadEdu();
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
    if (this.navSuscription) {
      this.navSuscription.unsubscribe();
    }
  }
}
