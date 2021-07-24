import { Component, OnInit } from '@angular/core';
import bootstrap from "bootstrap";
import { FormControl, NgForm, FormsModule } from '@angular/forms';
import { MammaService } from '../mamma.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private appService: MammaService,private _router: Router) {

  }
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  ngOnInit() {
  }
  errorArray: any;
  registerUser() {
    this.errorArray=undefined;
    let postdata: any = {}
    postdata.email = this.email;
    postdata.password = this.password;
    postdata.confirmPassword = this.confirmPassword;
    this.appService.registerUser(postdata).subscribe((data) => {
      console.log(data);

      if (data.result == "success") {
        //redirect
        this._router.navigate(['login']);
      }
    }, (error) => {
      console.log(error);
      if (error.status == 400) {
        this.errorArray = error.error["ModelState"][""];
      }
    });
  }

  registerFacebookUser(){}

  registerGoogleUser(){
    this.appService.registerGoogleUser(window.location.origin).subscribe((data)=>{
console.log(data);
window.location.href= this.appService.apiURL+ data[0].Url
    },(error)=>{
      console.log('error in registerUsers',error);
    })
  }
}
