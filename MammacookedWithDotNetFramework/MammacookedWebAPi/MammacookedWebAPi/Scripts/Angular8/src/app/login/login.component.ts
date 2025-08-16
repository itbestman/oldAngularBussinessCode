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
    this.appService.token = undefined;
    localStorage.removeItem('token');

    data = "userName=" + encodeURIComponent(this.email) +
      "&password=" + encodeURIComponent(this.password) +
      "&grant_type=password";


    this.loginService.login(data).subscribe((data) => {

      this.appService.token = data.access_token;

      localStorage.setItem('token', data.access_token);


      this.appService.GetConsumerDetails().subscribe((data) => {
        if (data != null && Object.keys(data).length > 2) {//on new user also it having email and ok status field
          this.appService.hasCustomerDetail = true;
          this._router.navigate(['dashboard/dashboard']);
        }
        else if (data != null && Object.keys(data).length == 2) {
          this.appService.hasCustomerDetail = false;
          this._router.navigate(['dashboard/user']);
        }
      }, (error) => {
        console.log(error);
      });

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
