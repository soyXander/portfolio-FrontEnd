import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { faBars, faX, faHouse, faUser, faStar, faGraduationCap, faUserGear, faBriefcase, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  /**
   * Iconos
   */
  // Toggle
  faBars = faBars;
  faX = faX;

  // Menu
  faHouse = faHouse;
  faUser = faUser;
  faStar = faStar;
  faGraduationCap = faGraduationCap;
  faUserGear = faUserGear;
  faBriefcase = faBriefcase;
  faPaperPlane = faPaperPlane;


  constructor(private renderer: Renderer2, private elem: ElementRef){}

  /**
   * Función para abrir y cerrar el menu cuando se clickea el toggle.
   */
  toggleAction(){
    let menuToggle = this.elem.nativeElement.querySelector('.toggle');
    let sidebar = this.elem.nativeElement.querySelector('.sidebar')
    menuToggle.onclick = function(){
      menuToggle.classList.toggle('active');
      sidebar.classList.toggle('active');
    }
  }

  /**
   * Función que lista el elemento .list y agregar la clase 'active' cuando se clickea,
   * mientras que tambien se remueve la misma clase a los demas elementos.
   */
  markActive(){
    const list = this.elem.nativeElement.querySelectorAll('.list');
    for(let i = 0; i < list.length; i++){
      list[i].onclick = function(){
        let j = 0;
        while(j < list.length){
          list[j++].className = 'list';
        }
        list[i].className = 'list active';
      }
    }
  }
  ngOnInit(): void {

  }
}
