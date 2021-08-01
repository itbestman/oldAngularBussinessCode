import { Component, OnInit } from '@angular/core';
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
  apiUrl='';
  

  ngOnInit() {
    this.apiUrl= this.appService.apiURL+'/values?';
    this.loadFoodGroupItem();
  
  }
  loadFoodGroupItem() {
    this.appService.GetFoodGroupItems().subscribe((data) => {
      // this.foodGroupItem = JSON.parse(data.join(''));
      this.foodGroupItem = data;

      // this.foodGroupItem.map((fn)=>{
      //   fn.Image=this.appService.apiURL +'/values?'+ fn.Image
      //   return fn});

      console.log(this.foodGroupItem,'foodGroupItem');
    }, (error) => {
      console.log(error);
    });
  }
}
