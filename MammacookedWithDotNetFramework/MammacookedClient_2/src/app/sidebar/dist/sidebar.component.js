"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
exports.ROUTES = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', "class": '' },
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', "class": '' },
    { path: '/icons', title: 'Icons', icon: 'nc-diamond', "class": '' },
    { path: '/maps', title: 'Maps', icon: 'nc-pin-3', "class": '' },
    { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', "class": '' },
    { path: '/table', title: 'Table List', icon: 'nc-tile-56', "class": '' },
    { path: '/typography', title: 'Typography', icon: 'nc-caps-small', "class": '' },
    { path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', "class": 'active-pro' },
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebar-cmp',
            templateUrl: 'sidebar.component.html'
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
