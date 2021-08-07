"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var LoginService = /** @class */ (function () {
    function LoginService(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.apiURL = 'http://localhost:59786/api';
        this.hostURL = 'http://localhost:59786';
        this.token = localStorage.getItem('token');
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    }
    LoginService.prototype.checkLogin = function () {
        return this.http.get(this.apiURL + "/values");
    };
    LoginService.prototype.getValue = function () {
        return this.http.get(this.apiURL + "/values");
    };
    LoginService.prototype.login = function (data) {
        return this.http.post(this.hostURL + '/token', data, this.httpOptions);
    };
    LoginService.prototype.showNotification = function (notificType, message) {
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
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
