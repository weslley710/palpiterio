import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent { 
	
  login = '';
  senha = '';
  invalidLogin = false;
  
  @Input() error: string | null;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }
	
  ngOnInit() {}
  
  checkLogin() {
    (this.authenticationService.authenticate(this.login, this.senha).subscribe(
      data => {
        this.router.navigate(['dashboard']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
        this.error = 'Não foi possível realizar o login, algo de errado não está certo!';
      }
    ));
  }		
}
