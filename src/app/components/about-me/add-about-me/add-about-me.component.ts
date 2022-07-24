import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { UserDetails } from 'src/app/models/user-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-add-about-me',
  templateUrl: './add-about-me.component.html',
  styleUrls: ['./add-about-me.component.css']
})
export class AddAboutMeComponent {

  faCamera = faCamera;

  constructor(
    private UserDetailsService: UserDetailsService,
    private Router: Router,
    private iziToast: Ng2IzitoastService) { }

  firstName: string;
  lastName: string;
  location: string;
  title: string;
  description: string;
  facebookId: string;
  instagramId: string;
  githubId: string;
  linkedinId: string;
  twitterId: string;

  uploadedImage: File;
  uploadImageUrl: string = 'https://dummyimage.com/720x400';

  uploadImage(event: any) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadImageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.uploadedImage);
  }

  onCreate(): void {
    const userDetails = new UserDetails(this.firstName, this.lastName, this.location, this.title, this.description, this.facebookId, this.instagramId, this.githubId, this.linkedinId, this.twitterId);
    const image = this.uploadedImage;

    this.UserDetailsService.save(userDetails, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Sobre mi guardado',
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
  close() {
    this.Router.navigate(['/']);
  }
}
