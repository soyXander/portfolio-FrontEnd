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

  constructor(
    private expServices: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  company: string;
  position: string;
  description: string;
  image: string;
  uploadedImage: File;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    this.expServices.detail(id).subscribe(
      data => {
        this.company = data.company;
        this.position = data.position;
        this.description = data.description;
        this.image = 'http://localhost:8080/image/ver/' + data.image.name; // Por el momento no se usa.
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

  updateImage(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    const experience = new Experience(this.company, this.position, this.description);
    const image = this.uploadedImage;

    this.expServices.update(id, experience, image).subscribe(
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
