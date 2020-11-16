import { Pagination, PaginatedResult } from './../../_models/pagination';
import { AlertifyService } from './../../Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females' }];
  userParams: any = {};
  pagination: Pagination;
  // user: User;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

resetFilters() {
  this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
  this.userParams.minAge = 18;
  this.userParams.maxAge = 99;
  this.loadUsers();
}
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams, null)
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      // console.log(user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
