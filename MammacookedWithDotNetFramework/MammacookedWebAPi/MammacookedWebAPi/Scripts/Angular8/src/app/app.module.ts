import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, /* other http imports */ } from "@angular/common/http";

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { MammaService } from './mamma.service';
import { FoodgroupsComponent } from './foodgroups/foodgroups.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { AppHttpInterceptor } from "./appHttpInterceptor.service";
import {IConfig, NgxMaskModule} from 'ngx-mask';

export const options: Partial<IConfig> ={
  showMaskTyped:true
};

export function momentAdapterFactory() {
  return adapterFactory(moment);
}


@NgModule({
  declarations:[
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FoodgroupsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SidebarModule,
    FooterModule,
    NavbarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    NgxMaskModule.forRoot(options)
  ],
  exports: [RouterModule],
  providers: [MammaService,LoginService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AppHttpInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
