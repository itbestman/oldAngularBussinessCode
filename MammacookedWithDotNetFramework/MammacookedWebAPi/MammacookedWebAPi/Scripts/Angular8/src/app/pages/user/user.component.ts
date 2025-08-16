import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
declare var google: any;
import { MammaService } from 'app/mamma.service';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html',
  styleUrls:['./user.component.css']
})

export class UserComponent implements OnInit {

  ngOnInit() {

    this.loadPageInformation();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position:any)=>{
        if(position)
        {
          this.userData.FDALatLong = position.coords.latitude +' '+position.coords.longitude;
        }
      })
    }
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
    country: 'India',
    FDALatLong: '',
    Email: ''
  };

  loadPageInformation() {
    this.appService.GetConsumerDetails().subscribe((data) => {
      if (data != null && Object.keys(data).length>3) {//on new user also it having email and ok status field
        this.userData.about = data.About;
        this.userData.address = data.Address
        this.userData.city = data.City;
        this.userData.country = data.Country == '' ? 'India' : data.Country;
        this.userData.foodDeliveryAddress = data.BreakFastAddr;
        this.userData.FDALatLong = data.B_LatLong.trim()=='1'?this.userData.FDALatLong:data.B_LatLong;
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
        this.appService.showNotification("info","User Details are updated")
        this.loadPageInformation();
        window.location.reload();
      }
    }, (error) => {
      console.log(error);
    });
  }

  openGoogleMap() {
    var windowvar = window.open('https://www.google.com/maps/search/?api=1&query=' + this.userData.FDALatLong.replace(' ','') + '');
    //onclick = "window.open();"
    console.log(windowvar);
  }
}
