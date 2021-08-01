"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(appService, _router, config) {
        this.appService = appService;
        this._router = _router;
        this.config = config;
        this.isLoggedIn = sessionStorage.getItem('token') != undefined ? true : false;
        this.foodGroupData = [];
        config.interval = 2000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
        // config.pauseOnHover = true;
        this.appService.isLoggedIn = sessionStorage.getItem('token') != undefined ? true : false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadPage();
    };
    HomeComponent.prototype.loadPage = function () {
        var _this = this;
        this.appService.getFoodGroup().subscribe(function (data) {
            data.map(function (fn) {
                fn.Image = _this.appService.apiURL + '/values?' + fn.Image;
                return fn;
            });
            _this.foodGroupData = data;
        }, function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.jumpToFoodgrops = function () {
        this.appService.selectedFoodGroup = $('.active .groupNameForSelect')[0].innerText;
        this._router.navigate(["foodgroups"]);
    };
    HomeComponent.prototype.logout = function () {
        sessionStorage.clear();
        this._router.navigate(["login"]);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
