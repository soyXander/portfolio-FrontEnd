import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { UserDetails } from 'src/app/models/user-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit {

  faPen = faPen;

  constructor(
    private userDetServices: UserDetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  firstName: string;
  lastName: string;
  location: string;
  title: string;
  description: string;
  profileImg: string;
  facebookId: string;
  instagramId: string;
  githubId: string;
  linkedinId: string;
  twitterId: string;

  uploadedImage: File;
  uploadImageUrl: string = 'https://dummyimage.com/483x724';

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    this.userDetServices.view(id).subscribe(
      data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.location = data.location;
        this.title = data.title;
        this.description = data.description;
        if (data != null && data.image != null) {
          this.profileImg = 'http://localhost:8080/image/ver/' + data.image.name;
        }
        this.facebookId = data.facebookId;
        this.instagramId = data.instagramId;
        this.githubId = data.githubId;
        this.linkedinId = data.linkedinId;
        this.twitterId = data.twitterId;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight',
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
    const userDetails = new UserDetails(this.firstName, this.lastName, this.location, this.title, this.description, this.facebookId, this.instagramId, this.githubId, this.linkedinId, this.twitterId);
    const image = this.uploadedImage;

    this.userDetServices.update(id, userDetails, image).subscribe(
      data => {
        this.iziToast.success({
          title: 'Sobre mi actualizado',
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
