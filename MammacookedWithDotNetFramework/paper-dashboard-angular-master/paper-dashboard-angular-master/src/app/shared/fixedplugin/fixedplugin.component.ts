import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'fixedplugin-cmp',
    templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit{

  public sidebarColor: string = "white";
  public sidebarActiveColor: string = "danger";

  public state: boolean = true;

  changeSidebarColor(color){
    var sidebar = <HTMLElement>document.querySelector('.sidebar');
    var navbar = <HTMLElement>document.querySelector('.navbar');
    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data-color',color);
    }

    if(navbar != undefined)
    {
      navbar.setAttribute('style','background-color: '+color+' !important;')
      navbar.setAttribute('data-color',color);
    }
  }
  changeSidebarActiveColor(color){
    var sidebar = <HTMLElement>document.querySelector('.sidebar');
    var navbar = <HTMLElement>document.querySelector('.navbar');
    this.sidebarActiveColor = color;
    if(sidebar != undefined){
        sidebar.setAttribute('data-active-color',color);
    }

    if(navbar != undefined)
    {
      sidebar.setAttribute('data-active-color',color);
    }
  }
  ngOnInit(){}
}
