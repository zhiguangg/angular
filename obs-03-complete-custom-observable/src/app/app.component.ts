import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated = false;
  activatedUser: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedUser = this.userService.activated.subscribe(
      (data) =>{
        this.activated = data;
      }
    )  
  }

  ngOnDestroy() {
    this.activatedUser.unsubscribe();
  }
}
