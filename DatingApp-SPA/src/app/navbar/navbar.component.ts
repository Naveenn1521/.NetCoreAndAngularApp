import { AuthServiceService } from './../Services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(res => {
      console.log('Logged in Succsesfully');
    }, error => {
      console.log('An error occured');
    });
  }

  loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out Succsesfully');
  }

}
