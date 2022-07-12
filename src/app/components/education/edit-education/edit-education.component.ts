import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  faPen = faPen;

  constructor(
    private eduService: EducationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  institute: string;
  certification: string;
  description: string;
  uploadedImage: File;
  uploadImageUrl: string;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.eduService.detail(id).subscribe(
      data => {
        this.institute = data.institute;
        this.certification = data.certification;
        this.description = data.description;
        this.uploadImageUrl = 'http://localhost:8080/image/ver/' + data.image.name;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.message,
        });
        this.router.navigate(['/']);
      }
    );
  }

  updateImage(event: any) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadImageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.uploadedImage);
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    const education = new Education(this.institute, this.certification, this.description);
    const image = this.uploadedImage;
    this.eduService.update(id, education, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Educación actualizada',
          message: data.message,
        });
        this.router.navigate(['/']);
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.message,
        });
        this.router.navigate(['/']);
      }
    );
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
