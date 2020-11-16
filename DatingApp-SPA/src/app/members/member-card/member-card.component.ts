import { AlertifyService } from './../../Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthServiceService } from './../../Services/auth-service.service';
import { User } from './../../_models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private authService: AuthServiceService, private userService: UserService
    ,         private alertifyService: AlertifyService) { }

  ngOnInit(): void {

  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(date => {
        this.alertifyService.success('You have Liked:' + this.user.knownAs);
    }, error => {
        this.alertifyService.error(error);
    });
  }

}
