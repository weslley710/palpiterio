import { Component, OnInit } from '@angular/core';
import { NavData } from '../../_nav';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
//  public navItems = navItems;

  public navItems = [];

  constructor(private authenticationService: AuthenticationService, private navData: NavData) { }

  ngOnInit(): void {
	this.navItems = this.navData.getNavItens();
  }

  logout() {
	this.authenticationService.logOut();
  }
  
  getUserLogged() {
	return this.authenticationService.userLogged();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}