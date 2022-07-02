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
export class AboutMeComponent implements OnDestroy {
  navSuscription: any;

  // Iconos
  faCamera = faCamera;
  faPen = faPen;
  faPlus = faPlus;
  faXmark = faXmark;

  userDetails: UserDetails;
  isLoggedIn: boolean;
  isAdmin = false;
  roles: string[] = [];
  profileImg: string;

  constructor(
    private userDetService: UserDetailsService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService
  ) {
    this.navSuscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadUserDetails();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.roles = this.tokenStorageService.getAuthorities();
      if (this.isLoggedIn && this.roles.includes('ROLE_ADMIN'))
        this.isAdmin = true;
    });
  }

  loadUserDetails(): void {
    this.userDetService.view(1).subscribe(
      data => {
        this.userDetails = data;
        this.profileImg = 'http://localhost:8080/image/ver/' + data.image.name;
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: err.message,
          position: 'bottomRight'
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navSuscription) {
      this.navSuscription.unsubscribe();
    }
  }
}
