import { Component, OnInit } from '@angular/core';
import { MammaService } from 'app/mamma.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
//nc-bank'
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard/dashboard',     title: 'Dashboard',         icon:'nc-tv-2',       class: '' },
    { path: '/dashboard/planner',         title: 'Planner',             icon:'nc-tap-01',    class: '' },
    // { path: '/dashboard/maps',          title: 'Treck',              icon:'nc-pin-3',      class: '' },
    // { path: '/dashboard/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/dashboard/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    /*{ path: '/dashboard/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },*/
    // { path: '/dashboard/typography',    title: 'Promotions',        icon:'nc-trophy', class: '' },
    { path: '/dashboard/aboutus',       title: 'About Us',    icon:'nc-notes',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private appService: MammaService) {        
    }

    ngOnInit() {
        this.appService.GetConsumerDetails().subscribe((data) => {
            if (data != null && Object.keys(data).length>2) {//on new user also it having email and ok status field
                this.menuItems = ROUTES.filter(menuItem => menuItem);
            }else if (data != null && Object.keys(data).length==2)
            {
                this.menuItems = ROUTES.filter((menuItem)=>{
                    return menuItem.path=='/dashboard/user'
                })
            }
          }, (error) => {
            console.log(error);
          });



        
    }
}
