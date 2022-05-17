import { Component, OnInit } from '@angular/core';
declare var google: any;
import { MammaService } from 'app/mamma.service';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  ngOnInit() {
    this.loadPageInformation();
  }

  constructor(private appService: MammaService) {
  }
  userData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    altPhoneNumber: '',
    foodDeliveryAddress: '',
    about: '',
    country: '',
    FDALatLong: '',
    Email:''
  };

  loadPageInformation() {
    this.appService.GetConsumerDetails().subscribe((data) => {
      if (data != null) {
        this.userData.about = data.About;
        this.userData.address = data.Address
        this.userData.city = data.City;
        this.userData.country = data.Country;
        this.userData.foodDeliveryAddress = data.BreakFastAddr;
        this.userData.FDALatLong = data.B_LatLong;
        this.userData.firstName = data.FirstName;
        this.userData.lastName = data.LastName;
        this.userData.postalCode = data.PostalCode;
        this.userData.phoneNumber = data.Phone_1;
        this.userData.altPhoneNumber = data.Phone_2;
        this.userData.Email = data.Email;
      }
    }, (error) => {
      console.log(error);
    });
  }

  fillSameAddress() {
    this.userData.foodDeliveryAddress = this.userData.address;
  }

  UpdateProfile() {
    this.appService.UpdateConsumer(this.userData).subscribe((data) => {
      if (data == 1) {
        alert('Updated Successfully');
        this.loadPageInformation();
      }
    }, (error) => {
      console.log(error);
    });
  }

  openGoogleMap() {
    var windowvar = window.open('https://www.google.com/maps/' + this.userData.FDALatLong + ',17.23z');
    //onclick = "window.open();"
    console.log(windowvar);
  }
}
