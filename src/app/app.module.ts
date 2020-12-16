import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerDetailsComponent } from './player/player-details/player-details.component';
import { PlayerRowComponent } from './player/player-row/player-row.component';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { appInitializer } from '../app/helper/app.initialiser';
import { UserService } from './user.service';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    PlayerDetailsComponent,
    PlayerRowComponent,
    PlayerListComponent,
    PlayerFormComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
   
    AppRoutingModule,
     ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [UserService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
