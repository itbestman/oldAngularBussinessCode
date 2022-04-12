import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { MammaService } from '../mamma.service';
import { Session } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
//declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private _router: Router, private appService: MammaService) { }
  errorArray: any = [];
  email: string = "";
  password: string = "";

  ngOnInit() {
  }


  loginUser1() {
    this.loginService.checkLogin().subscribe((data) => {
      console.log(data);
    });
  }

  loginUser() {
    let data: any = {};
    //data = "grant_type=password&username=" + this.email + "&password=" + this.password;

    data = "userName=" + encodeURIComponent(this.email) +
      "&password=" + encodeURIComponent(this.password) +
      "&grant_type=password";


    this.loginService.login(data).subscribe((data) => {
      console.log(data);
      sessionStorage.setItem('token', data.access_token);
      if (!this.appService.token) {
        this.appService.token = data.access_token;
      }
      
      this._router.navigate(['dashboard/dashboard']);
    }, (error) => {
      console.log("error ", error);
      if (error.status == 400) {
        this.errorArray[0] = error.error.error_description;
        this.errorArray = this.errorArray == undefined ? error.error.ModelState["model.Password"] : this.errorArray;

        for (let x of this.errorArray) {
          this.loginService.showNotification('error', x);
        }
      }
    }
    );
  }
}
