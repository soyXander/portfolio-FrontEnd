import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})

export class AddExperienceComponent {

  //faPlus = faPlus;
  constructor(
    private expService: ExperienceService,
    private iziToast: Ng2IzitoastService,
    private router: Router
    ) { }

  company: string = '';
  position: string = '';
  description: string = '';
  uploadedImage: File;

  uploadImage(event: any){
    this.uploadedImage = event.target.files[0];
  }

  onCreate(): void {
    const experience = new Experience(this.company, this.position, this.description);
    const image = this.uploadedImage;

    this.expService.save(experience, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Experiencia creada',
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
