import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { BannerService } from 'src/app/services/banner.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnDestroy {
  navSuscription: any;

  faCamera = faCamera;

  isLoggedIn: boolean;
  isAdmin = false;
  roles: string[] = [];
  bannerUrl: string = 'https://dummyimage.com/1920x1080';

  constructor(
    private bannerService: BannerService,
    private tokenStorageService: TokenStorageService,
    private router: Router
    ) {
      this.navSuscription = this.router.events.subscribe((evt: any) => {
        if (evt instanceof NavigationEnd)
          this.loadBanner();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.roles = this.tokenStorageService.getAuthorities();
      if (this.isLoggedIn && this.roles.includes('ROLE_ADMIN'))
        this.isAdmin = true;
    });
  }

  loadBanner(): void {
    this.bannerService.view(1).subscribe(
      data => {
        if (data != null) {
          this.bannerUrl = 'http://localhost:8080/image/ver/' + data.image.name;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navSuscription)
      this.navSuscription.unsubscribe();
  }
}
