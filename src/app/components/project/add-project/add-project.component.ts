import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  faPen = faPen;

  constructor(
    private projectService: ProjectService,
    private iziToast: Ng2IzitoastService,
    private router: Router) { }

  project: string;
  creationDate: string;
  description: string;
  link: string;
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
    const project = new Project(this.project, this.creationDate, this.description, this.link);
    const image = this.uploadedImage;

    this.projectService.save(project, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Proyecto creado',
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
  close(): void {
    this.router.navigate(['/']);
  }

}
