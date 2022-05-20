import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn: boolean;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService
  ) {
    this.tokenStorage.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    const { username, password } = this.form;
    this.loginService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.tokenStorage.isLoggedIn.next(true);
        this.iziToast.success({
          title: 'Login',
          message: 'Login exitoso',
          position: 'bottomRight'
        });
        this.close();
      },
      err => {
        this.isLoginFailed = true;
        this.iziToast.error({
          title: 'Error',
          message: 'err.message',
          position: 'bottomRight'
        });
      }
    );
  }

  @HostListener('window:keyup.esc')
  close(): void {
    this.router.navigate(['/']);
  }
}
