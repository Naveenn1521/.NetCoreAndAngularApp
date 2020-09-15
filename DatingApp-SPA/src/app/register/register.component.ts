import { AuthServiceService } from './../Services/auth-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registered succsesfully');
    }, error => {
      console.log('an Error Occured');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    // console.log();
  }

}
