import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faPen, faPlaceOfWorship, faPlus, faUserGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  navSubscription: any;

  // Iconos
  faUserGear = faUserGear;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  skills: Skill[] = [];

  constructor(
    private skillService: SkillService,
    private iziToast: Ng2IzitoastService,
    private router: Router
    ) {
      this.navSubscription = this.router.events.subscribe((evt: any) => {
        if (evt instanceof NavigationEnd) {
          this.loadSkills();
        }
      });
    }

  ngOnInit(): void {
    this.loadSkills();
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
