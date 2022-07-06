import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;

  isLoggedIn: boolean;

  constructor(
    private tokenStorageService: TokenStorageService,
    private iziToast: Ng2IzitoastService) {
      this.tokenStorageService.isLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
    });
 }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLogged();
  }

  logout() {
    this.tokenStorageService.logOut();
    this.iziToast.show({
      title: '¡Adios!',
      message: 'Se cerro sesión correctamente',
      color: 'orange'
    });
    this.tokenStorageService.isLoggedIn.next(false);
  }
}
