import { Component, ElementRef, HostListener, Injectable, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { ExperienceComponent } from '../experience.component';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})

export class AddExperienceComponent implements OnInit {

  faPlus = faPlus;
  constructor(private elem: ElementRef,
              private experienceService: ExperienceService,
              private iziToast: Ng2IzitoastService,
              private exp: ExperienceComponent) { }

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
        this.exp.loadExp();
        this.toggleModal();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
      });
      this.toggleModal();
    });
  }

  toggleModal(){
    const modal = this.elem.nativeElement.querySelector('.modal-addexp');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
  }

  @HostListener('window:keyup.esc')
  onKeyUp(){
    const modal = this.elem.nativeElement.querySelector('.modal');
    if(!modal.classList.contains('opacity-0')){
      this.toggleModal();
    }
  }
}
