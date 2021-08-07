"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(appService, _router) {
        this.appService = appService;
        this._router = _router;
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        this.errorArray = undefined;
        var postdata = {};
        postdata.email = this.email;
        postdata.password = this.password;
        postdata.confirmPassword = this.confirmPassword;
        this.appService.registerUser(postdata).subscribe(function (data) {
            console.log(data);
            if (data.result == "success") {
                //redirect
                _this._router.navigate(['login']);
            }
        }, function (error) {
            console.log(error);
            if (error.status == 400) {
                _this.errorArray = error.error["ModelState"][""];
                _this.errorArray = _this.errorArray == undefined ? error.error.ModelState["model.Password"] : _this.errorArray;
                for (var _i = 0, _a = _this.errorArray; _i < _a.length; _i++) {
                    var x = _a[_i];
                    _this.appService.showNotification('error', x);
                }
            }
        });
    };
    RegisterComponent.prototype.registerFacebookUser = function () { };
    RegisterComponent.prototype.registerGoogleUser = function () {
        var _this = this;
        this.appService.registerGoogleUser(window.location.origin).subscribe(function (data) {
            console.log(data);
            window.location.href = _this.appService.apiURL + data[0].Url;
        }, function (error) {
            console.log('error in registerUsers', error);
        });
    };
    RegisterComponent.prototype.login = function () {
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
