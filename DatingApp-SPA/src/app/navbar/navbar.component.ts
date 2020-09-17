import { AlertifyService } from './../Services/alertify.service';
import { AuthServiceService } from './../Services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthServiceService, private alertify: AlertifyService,
              private router: Router)  { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(res => {
      this.alertify.success('Logged in Succsesfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return  this.authService.loggedin();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.success('Logged out Succsesfully');
    this.router.navigate(['/home']);
  }

}
