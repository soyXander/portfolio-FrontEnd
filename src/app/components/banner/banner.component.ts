import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class BannerComponent implements OnInit, OnDestroy {
  navSubscription: any;

  faCamera = faCamera;

  isLoggedIn: boolean;
  isAdmin: boolean;
  bannerUrl: string = 'https://dummyimage.com/1920x1080';

  constructor(
    private bannerService: BannerService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.navSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd)
        this.loadBanner();
    });
    this.tokenStorageService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = this.tokenStorageService.isLogged();
      this.isAdmin = this.tokenStorageService.isAdmin();
    });
  }

  loadBanner(): void {
    this.bannerService.list().subscribe(
      data => {
        if (data[0]?.image != null) {
          this.bannerUrl = 'http://localhost:8080/image/ver/' + data[0]?.image.name;
        }
      },
      err => {
        this.iziToast.error({
          title: 'Error al cargar el banner',
          message: err.error.message,
          position: 'bottomRight',
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navSubscription)
      this.navSubscription.unsubscribe();
  }
}
