import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent implements OnInit {

  faStar = faStar;

  experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService,
              public iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.showExp();
  }

  showExp(): void {
    this.experienceService.list().subscribe(
      data => {
        this.experiences = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id: any) {
    this.experienceService.delete(id).subscribe(
      data => {
        this.iziToast.success({
          title: 'Experiencia eliminada',
          message: 'La experiencia ha sido eliminada correctamente',
          position: 'topRight'
        });
        this.showExp();
      },
      err => {
        console.log(err);
      }
    );
  }
}
