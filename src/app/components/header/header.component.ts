import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DataSharingService } from 'src/app/services/data-sharing.service';
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
    private dataSharingService: DataSharingService) {
    this.dataSharingService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
 }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
