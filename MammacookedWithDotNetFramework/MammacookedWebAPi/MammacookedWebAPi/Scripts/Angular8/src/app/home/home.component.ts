import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MammaService } from '../mamma.service';
import { Router } from '@angular/router';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';

import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView} from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';


declare var $: any;
/*calender*/
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
/*calender*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  //view: CalendarView = CalendarView.Month;
  //CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  BreackFast: string[] = [];
  Lunch: string[] = [];
  Dinner: string[] = [];

  /*  calander start*/
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
       // this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        console.log(event,'Delete');
      },
    },
  ];
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 5),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;
  /*calander end*/



  constructor(private appService: MammaService, private _router: Router) {
  }

  public isLoggedIn = false;
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public foodGroupData = [];
  public selectedDayForEditFoodPlan;
  /*start calender*/
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    
    console.log(date,'date');
    if (isSameMonth(date, this.viewDate)) {

      if (new Date() <= date) {
        this.selectedDayForEditFoodPlan = date.toDateString();
      }

      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }



  addEvent(): void {
    this.events = [
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  /*end calender*/
  
  ngOnInit() {
    this.isLoggedIn = this.appService.isLoggedIn();
    this.loadPage();
  }

  togglePaused() {
      this.carousel.pause();
  }

  loadPage() {

    this.appService.getFoodGroup().subscribe((data) => {
      this.foodGroupData = data;
      setTimeout(function () {
        let ele: HTMLElement = document.querySelector('.carousel-control-prev-icon') as HTMLElement;
        ele.click();
        //document.getElementsByClassName('carousel-control-prev-icon')[0].click()
      }, 1000);
    }, (error) => {
      console.log(error);
    });
  }

  jumpToFoodgrops(arg='Y') {
    if (arg!='N') {
      this.appService.selectedFoodGroup = document.getElementsByClassName('carousel-item active')[0].getElementsByClassName('groupId')[0].innerHTML;
    }
    this._router.navigate(["foodgroups"])
  }
  
  logout() {
    sessionStorage.clear();
    this.appService.logOut().subscribe((data) => {
      this.isLoggedIn = this.appService.isLoggedIn();
      this._router.navigate(["home"]);
    });
  }

  handleEvent(eventname, event) {
    console.log(eventname, 'eventname');
    console.log(event, 'event');
  }




}
