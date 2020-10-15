import { User } from './../../_models/user';
import { AlertifyService } from './../../Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute ) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getimages();
    // console.log(this.galleryImages);
  }


getimages() {
  const imageUrls = [];
  for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
  }
  return imageUrls;
}


  // getuserDetails() {
  //   this.userService.getuser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //       this.user = user;
  //   },
  //   error => {
  //     this.alertify.error(error);
  //   });
  // }

}
