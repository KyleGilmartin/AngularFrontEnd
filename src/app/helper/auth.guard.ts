import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


   constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const user = this.userService.userValue

    // note this is currently only checking if there is a user.
    // it doesn't use the permission levels.

    if (user) {
      return true;
    }

    // here there is no authenciated user so the application
    // is routed back to login. it adds the URL to the query string. This can be used
    // later when login succeds take the user back to their original location.

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


  
  
}
