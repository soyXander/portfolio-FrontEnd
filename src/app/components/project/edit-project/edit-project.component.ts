import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: Project = new Project('project', 'technology', 'description');

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.projectService.detail(id).subscribe(
      data => {
        this.project = data;
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

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.projectService.update(id, this.project).subscribe(
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
