import { Component, OnInit,ViewChild } from '@angular/core';
import { MammaService } from '../mamma.service';
import { Router } from '@angular/router';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
 
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
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

  togglePaused() {
      this.carousel.pause();
  }

  loadPage() {

    this.appService.getFoodGroup().subscribe((data) => {
      this.foodGroupData = data;
    }, (error) => {
      console.log(error);
    });
  }

  jumpToFoodgrops(arg='Y') {
    if (arg!='N') {
      this.appService.selectedFoodGroup = document.getElementsByClassName('carousel-item active')[0].getElementsByClassName('groupId')[0].innerHTML;
    }
    this._router.navigate(["foodgroups"])
  }
  
  logout() {
    sessionStorage.clear();
    this.appService.logOut().subscribe((data)=>{
      this._router.navigate(["login"]);
    });
    
  }

  
  // getImage(url) {
  //   var reternVal="";
  //   this.appService.getImage(url).subscribe((data) => {  
  //   return reternVal=data;
  //   }, (error) => {
  //     console.log(error);
  //   });
    
  // }
}
