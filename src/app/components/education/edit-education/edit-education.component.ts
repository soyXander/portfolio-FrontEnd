import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { environment } from 'src/environments/environment';

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

  apiUrl: string = environment.apiUrl;
  institute: string;
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean = false;
  uploadedImage: File;
  uploadImageUrl: string;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.eduService.detail(id).subscribe(
      data => {
        this.institute = data.institute;
        this.degree = data.degree;
        this.description = data.description;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        if (data.endDate == 'Actualmente') {
          this.isCurrently = true;
        }
        if (data != null && data.image != null) {
          this.uploadImageUrl = this.apiUrl + 'image/ver/' + data.image.name;
        }
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
        });
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
    const education = new Education(this.institute, this.degree, this.description, this.startDate, this.endDate);
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
          message: err.error.message,
        });
        this.router.navigate(['/']);
      }
    );
  }

  isCurrent(event: any) {
    if (event.target.checked && this.isCurrently == false) {
      this.isCurrently = true;
      this.endDate = 'Actualmente';
    }
    else {
      this.isCurrently = false;
      this.endDate = '';
    }
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }
}
