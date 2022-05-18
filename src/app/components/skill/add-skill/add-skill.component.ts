import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  constructor(
    private skillService: SkillService,
    private iziToast: Ng2IzitoastService,
    private router: Router
  ) { }

  skill: string;
  percentage: number;

  ngOnInit(): void {
  }

  onCreate(): void {
    const skill = new Skill(this.skill, this.percentage);
    this.skillService.save(skill).subscribe(
      data => {
        this.iziToast.success({
          title: 'Habilidad creada',
          message: data.message,
          position: 'bottomRight'
        });
        this.close();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
    });
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
