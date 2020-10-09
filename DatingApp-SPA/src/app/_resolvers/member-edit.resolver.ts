import { AuthServiceService } from './../Services/auth-service.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/_models/user';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
        constructor(private userService: UserService, private router: Router, private authService: AuthServiceService,
                    private alertify: AlertifyService) {}
            resolve(route: ActivatedRouteSnapshot): Observable<User> {
                return this.userService.getuser(this.authService.decodedToken.nameid).pipe(
                    catchError(error => {
                        this.alertify.error('An Error Occured while Loading your personnel Data');
                        this.router.navigate(['/members']);
                        return of(null);
                    })
                );
            }
}