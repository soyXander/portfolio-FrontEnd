import { Component, ElementRef, HostListener, Injectable, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})

export class AddExperienceComponent implements OnInit {

  faPlus = faPlus;
  constructor(
    private experienceService: ExperienceService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  companyName: string = '';
  position: string = '';
  description: string = '';

  ngOnInit(): void {
  }

  onCreate(): void {
    const experience = new Experience(this.companyName, this.position, this.description);
    this.experienceService.save(experience).subscribe(
      data => {
        this.iziToast.success({
          title: 'Experiencia creada',
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
  onKeyUp(){
    this.router.navigate(['/']);
  }

  close(){
    this.router.navigate(['/']);
  }
}
