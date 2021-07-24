import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MammaService } from './mamma.service';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Routes } from "@angular/router";
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";

  import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    //bootstrap,
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'register', component: RegisterComponent }
    // ]
    //)
  ],
  providers: [MammaService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
