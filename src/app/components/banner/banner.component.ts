import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  navSubscription: any;

  faCamera = faCamera;

  apiUrl: string = environment.apiUrl;
  banner: Banner[];
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
        this.banner = data;
        if (data[0]?.image != null) {
          this.bannerUrl = this.apiUrl + 'image/ver/' + data[0]?.image.name;
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
