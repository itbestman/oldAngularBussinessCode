"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
var http_1 = require("@angular/common/http");
//import 'rxjs/Rx';
var rxjs_1 = require("rxjs");
var MammaService = /** @class */ (function () {
    function MammaService(httpClient, toastr) {
        this.httpClient = httpClient;
        this.toastr = toastr;
        this.apiURL = 'http://localhost:59786/api';
        this.token = sessionStorage.getItem('token');
        this.selectedFoodGroup = "";
        this.httpOptionsBearer = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
                'Authorization': 'Bearer ' + this.token
            })
        };
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            })
        };
        this.isLoggedIn = false;
    }
    MammaService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    ;
    MammaService.prototype.firstget = function () {
        return this.httpClient.get(this.apiURL + "/values");
    };
    MammaService.prototype.getValue = function (data) {
        if (data === void 0) { data = { name: 'the' }; }
        return this.httpClient.get(this.apiURL + "/values");
    };
    MammaService.prototype.postValue = function (data) {
        if (data === void 0) { data = { name: 'the' }; }
        return this.httpClient.post(this.apiURL + "/values", data, this.httpOptionsBearer);
    };
    MammaService.prototype.registerUser = function (data) {
        return this.httpClient.post(this.apiURL + "/account/register", data, this.httpOptions);
    };
    MammaService.prototype.registerFacebookUser = function (data) {
        return this.httpClient.post(this.apiURL + "/account/register", data, this.httpOptions);
    };
    MammaService.prototype.registerGoogleUser = function (base) {
        return this.httpClient.get(this.apiURL + "/Account/ExternalLogins?returnUrl=" + base + "&generateState=true");
    };
    MammaService.prototype.showNotification = function (notificType, message) {
        var X = 'bottom';
        var Y = 'right';
        switch (notificType) {
            case "info":
                this.toastr.info('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>', "", {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-info alert-with-icon",
                    positionClass: "toast-" + X + "-" + Y
                });
                break;
            case 'success':
                this.toastr.success('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>', "", {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: "toast-" + X + "-" + Y
                });
                break;
            case 'warning':
                this.toastr.warning('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>', "", {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-warning alert-with-icon",
                    positionClass: "toast-" + X + "-" + Y
                });
                break;
            case 'error':
                this.toastr.error('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>', "", {
                    timeOut: 4000,
                    enableHtml: true,
                    closeButton: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: "toast-" + X + "-" + Y
                });
                break;
            case 'show':
                this.toastr.show('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>', "", {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-primary alert-with-icon",
                    positionClass: "toast-" + X + "-" + Y
                });
                break;
            default:
                break;
        }
    };
    // Home page API Start
    MammaService.prototype.getFoodGroup = function (data) {
        if (data === void 0) { data = { name: 'the' }; }
        return this.httpClient.post(this.apiURL + "/homepage/GetFoodGroup", data, this.httpOptions);
    };
    //
    // FoodGroup page API Start
    MammaService.prototype.GetFoodGroupItems = function (data) {
        if (data === void 0) { data = { name: 'the' }; }
        return this.httpClient.post(this.apiURL + "/homepage/GetFoodGroupItems", data, this.httpOptions);
    };
    //
    MammaService.prototype.GetUserInformation = function (data) {
        if (data === void 0) { data = { name: 'the' }; }
        return this.httpClient.get(this.apiURL + "/Account/UserInfo", this.httpOptionsBearer);
    };
    MammaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MammaService);
    return MammaService;
}());
exports.MammaService = MammaService;
// headers = new HttpHeaders().set("Content-Type", "application/json")
// .set("charset", "UTF-8");
// getAllPatientCharts(username: string, sqldateformat: number): Observable<any> {
//   return this.http.get('/api/MyCharts/GetAllPatientCharts?username=' + username + '&sqldateformat=' + sqldateformat,
//     this.options).timeoutWith(2000, Observable.throw(new Error('Error!')))
//     .map((res: Response) => res.json()
//     );
// }
//private options = new RequestOptions({ headers: this.headers });
// private httpOptionsBerrer = new HttpHeaders({
//   'Content-Type': 'application/json',
//   'charset': 'UTF-8',
//   'Authorization': 'Bearer ' + this.token
// });
