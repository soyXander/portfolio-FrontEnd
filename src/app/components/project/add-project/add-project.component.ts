import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private iziToast: Ng2IzitoastService,
    private router: Router
  ) { }

  project: string = '';
  technology: string = '';
  description: string = '';

  ngOnInit(): void {
  }

  onCreate(): void {
    const project = new Project(this.project, this.technology, this.description);
    this.projectService.save(project).subscribe(
      data => {
        this.iziToast.success({
          title: 'Proyecto creado',
          message: data.message,
          position: 'bottomRight'
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
