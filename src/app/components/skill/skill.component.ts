import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faPen, faPlus, faUserGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {

  navSubscription: any;

  // Iconos
  faUserGear = faUserGear;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  skills: Skill[] = [];
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private skillService: SkillService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadSkills();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = this.tokenStorageService.isLogged();
      this.isAdmin = this.tokenStorageService.isAdmin();
    });
  }

  loadSkills(): void {
    this.skillService.list().subscribe(
      data => {
        this.skills = data;
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
    this.skillService.delete(id).subscribe(
      data => {
        this.iziToast.info({
          title: 'Habilidad eliminada',
          message: data.message,
          position: 'bottomRight'
        });
        this.loadSkills();
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
