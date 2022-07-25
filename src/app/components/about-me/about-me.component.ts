import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCamera, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { UserDetails } from 'src/app/models/user-details';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {
  navSubscription: any;

  // Iconos
  faCamera = faCamera;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  userDetails: UserDetails[];
  isLoggedIn: boolean;
  isAdmin: boolean;
  profileImg: string = 'https://dummyimage.com/483x724';

  constructor(
    private userDetService: UserDetailsService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadUserDetails();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = this.tokenStorageService.isLogged();
      this.isAdmin = this.tokenStorageService.isAdmin();
    });
  }

  loadUserDetails(): void {
    this.userDetService.list().subscribe(
      data => {
        this.userDetails = data;
        if (data != null && data[0]?.image != null) {
          this.profileImg = 'http://localhost:8080/image/ver/' + this.userDetails[0].image.name;
        }
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.error.message,
          position: 'bottomRight'
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }
}
