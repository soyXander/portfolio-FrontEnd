import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUser = faUser;

  constructor() { }

  test(){
    alert("Aqui tendria que estar un modal para el inicio de sesión.");
  }
  ngOnInit(): void {
  }

}
