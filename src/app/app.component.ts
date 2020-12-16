import { Component } from '@angular/core';
import { User } from './model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ass2part2';

  user: User;

  constructor(private userService: UserService) {
    this.userService.user.subscribe(user => this.user = user)
  }

  logout() {
    this.userService.logout();
  }
}
