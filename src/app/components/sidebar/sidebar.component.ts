import { Component, ElementRef } from '@angular/core';
import { faBars, faX, faHouse, faUser, faStar, faGraduationCap, faUserGear, faBriefcase, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

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

  constructor(private elem: ElementRef) { }

  /**
   * Función para abrir y cerrar el menu cuando se clickea el toggle.
   */

/* toggleAction() {
    const menuToggle = this.elem.nativeElement.querySelector('.toggle');
    const sidebar = this.elem.nativeElement.querySelector('.sidebar')
    menuToggle.onclick = function() {
      menuToggle.classList.toggle('active');
      sidebar.classList.toggle('active');
    }
  } */

  activeOnHover() {
    const sidebar = this.elem.nativeElement.querySelector('.sidebar')
    sidebar.classList.add('active');
  }

  activeOffHover() {
    const sidebar = this.elem.nativeElement.querySelector('.sidebar')
    sidebar.classList.remove('active');
  }

  /**
   * Función para agregar la clase 'active' en el elemento al hacer
   * click en el mismo mientras que en los demas elementos 'list'
   * se remueve la clase 'active'.
   */
  markActive() {
    const list = this.elem.nativeElement.querySelectorAll('.list');
    for(let i = 0; i < list.length; i++) {
      list[i].onclick = function() {
        let j = 0;
        while(j < list.length) {
          list[j++].className = 'list';
        }
        list[i].className = 'list active';
      }
    }

    /**
     * Al hacer click en el logo, se marca 'active' el primer elemento
     * de list, en este caso 'Inicio'.
     */
    const logo = this.elem.nativeElement.querySelector('.logo');
    logo.onclick = function() {
      let i = 0;
      while(i < list.length) {
        list[i++].className = 'list';
      }
      list[0].className = 'list active';
    }
  }
}
