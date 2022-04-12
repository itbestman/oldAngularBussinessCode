import { Component, OnInit } from '@angular/core';
declare var google: any;


@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  ngOnInit() {
    
  }

  userData = {
    address: '',
    foodDeliveryAddress: ''
  };

  fillSameAddress() {
    this.userData.foodDeliveryAddress = this.userData.address;
  }

  UpdateProfile() {

  }
}
