import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
) {
    // redirect to home if already logged in
    if (this.userService.userValue) {
        this.router.navigate(['/']);
    }
}

  ngOnInit(): void {
  }

  login() {
    this.userService.login();
}

}