import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent {

  faPen = faPen;

  constructor(
    private eduService: EducationService,
    private iziToast: Ng2IzitoastService,
    private router: Router) { }

  institute: string;
  certification: string;
  description: string;
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
    const education = new Education(this.institute, this.certification, this.description);
    const image = this.uploadedImage;

    this.eduService.save(education, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Educación guardada',
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
