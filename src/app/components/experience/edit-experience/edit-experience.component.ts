import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
})
export class EditExperienceComponent implements OnInit {

  experience: Experience = new Experience('company', 'position', 'description');

  constructor(
    private expServices: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    this.expServices.detail(id).subscribe(
      data => {
        this.experience = data;
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
    this.expServices.update(id, this.experience).subscribe(
      data => {
        this.iziToast.success({
          title: 'Experiencia actualizada',
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
