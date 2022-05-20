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
    private tokenStorage: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService) {
      this.tokenStorage.isLoggedIn.subscribe(value => {
        this.isLoggedIn = value;
    });
 }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
  }

  logout() {
    this.tokenStorage.signOut();
    this.iziToast.show({
      title: '¡Adios!',
      message: 'Se cerro sesión correctamente',
      color: 'orange'
    });
    this.tokenStorage.isLoggedIn.next(false);
  }
}
