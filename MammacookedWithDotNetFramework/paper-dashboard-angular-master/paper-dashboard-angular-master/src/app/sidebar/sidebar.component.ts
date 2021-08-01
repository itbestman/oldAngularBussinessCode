import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/dashboard/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/dashboard/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/dashboard/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/dashboard/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/dashboard/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/dashboard/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/dashboard/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
