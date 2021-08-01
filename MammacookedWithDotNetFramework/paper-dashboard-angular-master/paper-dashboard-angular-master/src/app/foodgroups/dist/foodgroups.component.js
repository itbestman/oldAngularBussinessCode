"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var FoodgroupsComponent = /** @class */ (function () {
    function FoodgroupsComponent(ngTabConfig, appService, _router) {
        this.appService = appService;
        this._router = _router;
        this.foodGroupItem = [];
        this.selecteFood = "";
        this.apiUrl = '';
        ngTabConfig.justify;
        this.selecteFood = this.appService.selectedFoodGroup;
    }
    FoodgroupsComponent.prototype.ngOnInit = function () {
        this.apiUrl = this.appService.apiURL + '/values?';
        this.loadFoodGroupItem();
    };
    FoodgroupsComponent.prototype.loadFoodGroupItem = function () {
        var _this = this;
        this.appService.GetFoodGroupItems().subscribe(function (data) {
            _this.foodGroupItem = JSON.parse(data.join(''));
            _this.foodGroupItem.map(function (fn) {
                fn.Image = _this.appService.apiURL + '/values?' + fn.Image;
                return fn;
            });
            console.log(_this.foodGroupItem, 'foodGroupItem');
        }, function (error) {
            console.log(error);
        });
    };
    FoodgroupsComponent = __decorate([
        core_1.Component({
            selector: 'app-foodgroups',
            templateUrl: './foodgroups.component.html',
            styleUrls: ['./foodgroups.component.scss']
        })
    ], FoodgroupsComponent);
    return FoodgroupsComponent;
}());
exports.FoodgroupsComponent = FoodgroupsComponent;
