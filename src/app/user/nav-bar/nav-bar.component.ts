import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  showDropdown = false;
  showMobileMenu = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }


  toggleMobileMenu(){
    this.showMobileMenu = !this.showMobileMenu;
  }
}
