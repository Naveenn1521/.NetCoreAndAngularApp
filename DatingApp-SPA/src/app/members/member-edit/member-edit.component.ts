import { AuthServiceService } from './../../Services/auth-service.service';
import { UserService } from 'src/app/Services/user.service';
import { AlertifyService } from './../../Services/alertify.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService
    ,         private userService: UserService, private authService: AuthServiceService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  UpdateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertifyService.success('Profile updated succsesfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
