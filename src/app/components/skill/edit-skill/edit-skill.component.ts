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

  skill: Skill = new Skill('skill', 0);

  constructor(
    private skillServices: SkillService,
    private iziToast: Ng2IzitoastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.skillServices.detail(id).subscribe(
      data => {
        this.skill = data;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.message,
        });
        this.close();
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.skillServices.update(id, this.skill).subscribe(
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
          message: err.message,
        });
        this.close();
      }
    );
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}