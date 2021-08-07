import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewInit,AfterViewChecked } from '@angular/core';
//import { NgbTabsetConfig, NgbTabset } from '@ng-bootstrap/ng-bootstrap'
import { MammaService } from 'app/mamma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodgroups',
  templateUrl: './foodgroups.component.html',
  styleUrls: ['./foodgroups.component.scss']
})
export class FoodgroupsComponent implements OnInit {
  foodGroupItem: any = [];
  selecteFood: any = "";
  NgbTabsetConfig_
  constructor(private appService: MammaService, private _router: Router) {
    this.selecteFood = this.appService.selectedFoodGroup

  }

  ngOnInit() {
    this.loadFoodGroupItem();
    document.body.setAttribute("selectedId", 'sr' + this.selecteFood);
  }

  ngAfterViewInit(temp) {
    setTimeout(function () {
      document.getElementById(document.body.getAttribute('selectedId')).click();
    }, 1000);
  }
  ngAfterViewChecked(temp) {
    console.log(temp);
    
  }

  loadFoodGroupItem() {
    if (this.selecteFood == "") {
      this.selecteFood = "1";
    }
    this.appService.GetFoodGroupItems(this.selecteFood).subscribe((data) => {
      this.foodGroupItem = data;
      if (this.selecteFood != null && this.selecteFood != undefined) {
        //document.querySelector('#FoodGroupID' + this.selecteFood)
      }
      console.log(this.foodGroupItem, 'foodGroupItem');
    }, (error) => {
      console.log(error);
    });
  }



}
