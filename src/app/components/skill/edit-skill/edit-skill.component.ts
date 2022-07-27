import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill: string;
  percentage: number;

  constructor(
    private skillServices: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.skillServices.detail(id).subscribe(
      data => {
        this.skill = data.skill;
        this.percentage = data.percentage;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
        });
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    const skill = new Skill(this.skill, this.percentage);
    this.skillServices.update(id, skill).subscribe(
      data => {
        this.iziToast.success({
          title: 'Habilidad actualizada',
          message: data.message,
        });
        this.close();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
        });
      }
    );
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
