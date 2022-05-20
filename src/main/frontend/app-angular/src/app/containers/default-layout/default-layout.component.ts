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
  
  public showMenu = true;

  constructor(private authService: AuthenticationService, private navData: NavData) { }

  ngOnInit(): void {
	if (this.authService.roleMatch(['ADMIN'])) {
		this.navItems = this.navData.getNavItens();
	} else {
		this.showMenu = false;
	}
  }

  logout() {
	this.authService.logOut();
  }
  
  getUserLogged() {
	return this.authService.userLogged();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}