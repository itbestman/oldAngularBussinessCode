import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
//import 'rxjs/Rx';
import { Observable, throwError, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class MammaService {

  apiURL: string = 'http://localhost:59786/api';
  token = sessionStorage.getItem('token');
  selectedFoodGroup="";
  public showLoader:boolean=false;
  user:any={};
  httpOptionsBearer = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      'Authorization': 'Bearer ' + this.token
    })
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
    })
  };


  private actionUrl: string;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    this.httpOptionsBearer = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != undefined ? true : false;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  firstget(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/values`);
  }

  getValue(data = { name: 'the' }) {
    return this.httpClient.get<any>(this.apiURL + "/values");
  }
  postValue(data = { name: 'the' }) {
    return this.httpClient.post<any>(this.apiURL + "/values", data, this.httpOptionsBearer);
  }
  registerUser(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + "/account/register", data, this.httpOptions);
  }

  registerFacebookUser(data): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + "/account/register", data, this.httpOptions);
  }

  registerGoogleUser(base): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + "/Account/ExternalLogins?returnUrl=" + base + "&generateState=true");
  }
  showNotification(notificType: string, message: string) {
    let X: string = 'bottom';
    let Y: string = 'right';


    switch (notificType) {
      case "info":
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + X + "-" + Y
          }
        );
        break;
      case 'success':
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + X + "-" + Y
          }
        );
        break;
      case 'warning':
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + X + "-" + Y
          }
        );
        break;
      case 'error':
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + X + "-" + Y
          }
        );
        break;
      case 'show':
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + X + "-" + Y
          }
        );
        break;
      default:
        break;
    }
  }

  // Home page API Start
  getFoodGroup(data = { name: 'the' }) {
    return this.httpClient.post<any>(this.apiURL + "/homepage/GetFoodGroup", data, this.httpOptions);
  }
  //
  // FoodGroup page API Start
  GetFoodGroupItems(data) {
    return this.httpClient.post<any>(this.apiURL + "/homepage/GetFoodGroupItems", data, this.httpOptions);
  }
  // old not in use
  GetUserInformation(data = { name: 'the' }) {
    return this.httpClient.get<any>(this.apiURL + "/Account/UserInfo",this.httpOptionsBearer);
  }
  
  getImage(data) {
    return this.httpClient.get<any>(data,this.httpOptionsBearer);
  }

  UpdateConsumer(data) {
    return this.httpClient.post<any>(this.apiURL + "/Consumer/UpdateConsumer",JSON.stringify(data), this.httpOptionsBearer);
  }

  GetConsumerDetails(data={}) {
    return this.httpClient.post<any>(this.apiURL + "/Consumer/GetConsumerDetails",data,this.httpOptionsBearer);
  }

  logOut(data={})
  {
    return this.httpClient.post<any>(this.apiURL + "/Account/Logout",data,this.httpOptionsBearer);
  }
}
