import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
})
export class EditExperienceComponent implements OnInit {

  faPen = faPen;

  constructor(
    private expServices: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  apiUrl: string = environment.apiUrl;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean = false;
  uploadedImage: File;
  uploadImageUrl: string;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    this.expServices.detail(id).subscribe(
      data => {
        this.company = data.company;
        this.position = data.position;
        this.description = data.description;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        if (data.endDate == 'Actualmente') {
          this.isCurrently = true;
        }
        this.uploadImageUrl = this.apiUrl + 'image/ver/' + data.image.name;
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
    const experience = new Experience(this.company, this.position, this.description, this.startDate, this.endDate);
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
          message: err.error.message,
        });
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
