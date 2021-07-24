"use strict";
exports.__esModule = true;
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var foodgroups_component_1 = require("./foodgroups/foodgroups.component");
exports.AppRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        pathMatch: 'full'
    },
    {
        path: 'foodgroups',
        component: foodgroups_component_1.FoodgroupsComponent,
        pathMatch: 'full'
    },
    // {
    //   path: 'ds',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // }, 
    {
        path: '',
        component: admin_layout_component_1.AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }
        ]
    }
    // ,
    // {
    //   path: 'home',
    //   component: HomeComponent,
    //   pathMatch: 'full'
    // }
    // ,
    // {
    //   path: '**',
    //   redirectTo: 'dashboard'
    // }
];
