import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { LoginUser } from 'src/app/models/login-user';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser;
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn: boolean;
  roles: string[] = [];

  constructor(
    private loginService: LoginService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private iziToast: Ng2IzitoastService
  ) {
    this.tokenStorageService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  onSubmit() {
    const { username, password } = this.form;
    this.loginUser = new LoginUser(this.form.username, this.form.password);
    this.loginService.login(this.loginUser).subscribe(
      data => {
        this.tokenStorageService.setToken(data.token);
        this.tokenStorageService.setUsername(data.username);
        this.tokenStorageService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.isLoggedIn = true;
        this.tokenStorageService.isLoggedIn.next(true);
        this.iziToast.success({
          title: '¡Bienvenido!',
          message: 'Hola ' + data.username + '!',
          position: 'bottomRight'
        });
        this.close();
      },
      err => {
        this.iziToast.error({
          title: 'Error',
          message: 'Credenciales incorrectas',
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
