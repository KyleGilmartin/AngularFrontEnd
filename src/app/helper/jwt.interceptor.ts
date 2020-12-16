import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const user = this.userService.userValue;
        console.table(user);
        const isLoggedIn = user?.appToken;
        console.log('is logged in ' + isLoggedIn);
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log('is api Url ' + isApiUrl);

        console.log(`Bearer ${user?.appToken}`);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.appToken}` }
            });

        }


        return next.handle(request);
    }

    
}