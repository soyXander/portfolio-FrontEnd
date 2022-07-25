import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  faPen = faPen;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  project: string;
  technology: string;
  description: string;
  uploadedImage: File;
  uploadImageUrl: string;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.projectService.detail(id).subscribe(
      data => {
        this.project = data.project;
        this.technology = data.technology;
        this.description = data.description;
        this.uploadImageUrl = 'http://localhost:8080/image/ver/' + data.image.name;
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
    const project = new Project(this.project, this.technology, this.description);
    const image = this.uploadedImage;

    this.projectService.update(id, project, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Proyecto actualizado',
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

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }

}
