"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
//import * as $ from 'jquery';
//declare var $: any;
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, _router) {
        this.loginService = loginService;
        this._router = _router;
        this.errorArray = [];
        this.email = "";
        this.password = "";
        this.loginData = {
            grant_type: 'password',
            username: 'mkgupta1@ayaya.com',
            password: 'qqqqqqq'
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        // $.ajax({//declare var $: any;
        //   type: 'POST',
        //   url: 'http://localhost:59786/token',
        //   data: this.loginData,
        // }).done(function (data) {
        //   console.log(data, 'data');
        // }).fail(function (r) {
        //   console.log(r, 'fail data');
        // });
        //this.loginUser();
    };
    LoginComponent.prototype.loginUser1 = function () {
        this.loginService.checkLogin().subscribe(function (data) {
            console.log(data);
        });
    };
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        var data = {};
        //data = "grant_type=password&username=" + this.email + "&password=" + this.password;
        data = "userName=" + encodeURIComponent(this.email) +
            "&password=" + encodeURIComponent(this.password) +
            "&grant_type=password";
        this.loginService.login(data).subscribe(function (data) {
            console.log(data);
            sessionStorage.setItem('token', data.access_token);
            _this._router.navigate(['home']);
        }, function (error) {
            console.log("error ", error);
            if (error.status == 400) {
                _this.errorArray[0] = error.error.error_description;
                _this.errorArray = _this.errorArray == undefined ? error.error.ModelState["model.Password"] : _this.errorArray;
                for (var _i = 0, _a = _this.errorArray; _i < _a.length; _i++) {
                    var x = _a[_i];
                    _this.loginService.showNotification('error', x);
                }
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            providers: [login_service_1.LoginService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
