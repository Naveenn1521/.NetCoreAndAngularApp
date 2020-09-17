import { AlertifyService } from './../Services/alertify.service';
import { AuthServiceService } from './../Services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private route: Router, private alertify: AlertifyService ) {}
  canActivate(): boolean  {
    if (this.authService.loggedin()) {
      return true;

      this.alertify.error('Please Login before viewing any information');
      this.route.navigate(['/home']);
      return false;
    }
  }
}
