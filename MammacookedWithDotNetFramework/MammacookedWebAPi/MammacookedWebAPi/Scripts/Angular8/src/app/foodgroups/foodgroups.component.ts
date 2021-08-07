import { Component, OnInit,ViewChild,AfterContentChecked } from '@angular/core';
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
  selecteFood:any="";
  
  constructor( private appService: MammaService, private _router: Router) {
    this.selecteFood = this.appService.selectedFoodGroup
  }

  ngOnInit() {
    this.loadFoodGroupItem();
  }

  loadFoodGroupItem() {
      if (this.selecteFood=="") {
        this.selecteFood="1";
      }
    this.appService.GetFoodGroupItems(this.selecteFood).subscribe((data) => {
      this.foodGroupItem = data;
      console.log(this.foodGroupItem,'foodGroupItem');
    }, (error) => {
      console.log(error);
    });
  }
}
