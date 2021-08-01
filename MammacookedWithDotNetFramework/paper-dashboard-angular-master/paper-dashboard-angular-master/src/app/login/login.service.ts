import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'http://localhost:59786/api';
  hostURL: string = 'http://localhost:59786';
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {


  }


  checkLogin(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/values`);
  }

  getValue(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/values`);
  }

  login(data): Observable<any> {
    return this.http.post<any>(this.hostURL + '/token', data, this.httpOptions);
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

}
