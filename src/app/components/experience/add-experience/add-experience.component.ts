import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})

export class AddExperienceComponent {

  faPen = faPen;

  constructor(
    private expService: ExperienceService,
    private iziToast: Ng2IzitoastService,
    private router: Router) { }

  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean = false;
  uploadedImage: File;
  uploadImageUrl: string;

  uploadImage(event: any) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadImageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.uploadedImage);
  }

  onCreate(): void {
    const experience = new Experience(this.company, this.position, this.description, this.startDate, this.endDate);
    const image = this.uploadedImage;

    this.expService.save(experience, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Experiencia guardada',
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

  isCurrent(event: any) {
    if ( event.target.checked && this.isCurrently == false ) {
      this.isCurrently = true;
      this.endDate = 'Actualmente';
    }
    else {
      this.isCurrently = false;
      this.endDate = '';
    }
  }

  @HostListener('window:keyup.esc')
  close() {
    this.router.navigate(['/']);
  }

}
