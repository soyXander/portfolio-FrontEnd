import { Component, OnInit } from '@angular/core';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  faUserGear = faUserGear;

  constructor() { }

  ngOnInit(): void {
  }

}
