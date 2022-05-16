import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  // Icono
  faPlus = faPlus;

  constructor(
    private eduService: EducationService,
    private iziToast: Ng2IzitoastService,
    private router: Router
  ) { }

  institute: string = '';
  certification: string = '';
  description: string = '';

  ngOnInit(): void {
  }

  onCreate(): void {
    const education = new Education(this.institute, this.certification, this.description);
    this.eduService.save(education).subscribe(
      data => {
        this.iziToast.success({
          title: 'Educación creada',
          message: data.message,
          position: 'bottomRight'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
        this.router.navigate(['/']);
      });
  }

  @HostListener('window:keyup.esc')
  close(){
    this.router.navigate(['/']);
  }

}
