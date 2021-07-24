"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ngx_toastr_1 = require("ngx-toastr");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var sidebar_module_1 = require("./sidebar/sidebar.module");
var footer_module_1 = require("./shared/footer/footer.module");
var navbar_module_1 = require("./shared/navbar/navbar.module");
var fixedplugin_module_1 = require("./shared/fixedplugin/fixedplugin.module");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var login_service_1 = require("./login/login.service");
var register_component_1 = require("./register/register.component");
var http_1 = require("@angular/common/http");
var mamma_service_1 = require("./mamma.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent
            ],
            imports: [
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(app_routing_1.AppRoutes, {
                    useHash: true,
                    anchorScrolling: 'enabled'
                }),
                http_1.HttpClientModule,
                sidebar_module_1.SidebarModule,
                navbar_module_1.NavbarModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                footer_module_1.FooterModule,
                fixedplugin_module_1.FixedPluginModule,
                ng_bootstrap_1.NgbModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule
            ],
            providers: [mamma_service_1.MammaService, login_service_1.LoginService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
