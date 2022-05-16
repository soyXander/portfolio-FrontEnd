import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  education: Education = new Education('institute', 'certification', 'description');

  constructor(
    private eduService: EducationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService,
   ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.eduService.detail(id).subscribe(
      data => {
        this.education = data;
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

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.eduService.update(id, this.education).subscribe(
      data => {
        this.iziToast.success({
          title: 'Success',
          message: 'Update success',
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
