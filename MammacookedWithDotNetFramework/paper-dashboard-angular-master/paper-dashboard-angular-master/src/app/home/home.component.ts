import { Component, OnInit } from '@angular/core';
import { MammaService } from '../mamma.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private appService: MammaService, private _router: Router) {
    
    this.appService.isLoggedIn = sessionStorage.getItem('token') != undefined ? true : false;
  }

  public isLoggedIn =  sessionStorage.getItem('token') != undefined ? true : false;
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public foodGroupData = [];

  ngOnInit() {
    this.loadPage();
  }


  loadPage() {

    this.appService.getFoodGroup().subscribe((data) => {
      // data.map((fn) => {
      //   fn.Image = this.getImage( this.appService.apiURL + '/values?' + fn.Image)
      //   return fn
      // });

      this.foodGroupData = data;
    }, (error) => {
      console.log(error);
    });
  }

  jumpToFoodgrops() {
    this.appService.selectedFoodGroup = $('.active .groupNameForSelect')[0].innerText;
    this._router.navigate(["foodgroups"])
  }
  
  logout() {
    sessionStorage.clear();
    this.appService.logOut().subscribe((data)=>{
      this._router.navigate(["login"]);
    });
    
  }

  
  getImage(url) {
    var reternVal="";
    this.appService.getImage(url).subscribe((data) => {  
    return reternVal=data;
    }, (error) => {
      console.log(error);
    });
    
  }
}
