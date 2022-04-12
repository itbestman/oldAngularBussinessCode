import { Component } from '@angular/core';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { MammaService } from '../../mamma.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'icons-cmp',
  moduleId: module.id,
  templateUrl: 'planner.component.html'
})

export class PlannerComponent implements OnInit {



  BLD = {
    breackfast: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    lunch: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    dinner: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  viewDate: Date = new Date();// current date of calender
  thisMonthFoodPlan = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  activeDayIsOpen: boolean = true;// black description pannel, giving hint about plan
  selectedDayForEditFoodPlan: string;// clicked date
  defauldFoodPlan = [];
  myView = 'month';
  todayFoodPlans = [];
  //BreackFast: string[] = [];
  //Lunch: string[] = [];
  //Dinner: string[] = [];

  refresh: Subject<any> = new Subject();

  

  events: CalendarEvent[] = [

  ];
  constructor(private appService: MammaService) {
  }

  ngOnInit() {
    this.loadForm();
  }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, 'date');
    if (isSameMonth(date, this.viewDate)) {
      if (new Date() <= date) {
        this.selectedDayForEditFoodPlan = date.toDateString();
      }
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.loadDayFoodPlans();
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.loadThisMonthFoodPlans();
    this.todayFoodPlans = [];
  }

  editPlanOnDate(selectedDate) {
    console.log(selectedDate);
  }

  defauldFoodPlanBreackFast = [];
  defauldFoodPlanLunct = [];
  defauldFoodPlanDinner = [];
  loadForm() {

    this.loadDefaultFoodsPlans()
    this.loadThisMonthFoodPlans()
  }

  loadDefaultFoodsPlans() {
    this.appService.getDefaultFoodPlans().subscribe((data) => {// default food plans
      this.defauldFoodPlan = data;
      this.defauldFoodPlanBreackFast = this.defauldFoodPlan.filter(d => d.FoodtypeName == 'Breack Fast');
      this.defauldFoodPlanLunct = this.defauldFoodPlan.filter(d => d.FoodtypeName == 'Lunch');
      this.defauldFoodPlanDinner = this.defauldFoodPlan.filter(d => d.FoodtypeName == 'Dinner');
    }, (error) => {
      console.log(error);
    });
  }

  loadThisMonthFoodPlans() {
    this.appService.GetFoodPlansForMonth({ date: new Date(this.viewDate) }).subscribe((data) => {// just food plans
      this.thisMonthFoodPlan = JSON.parse(JSON.stringify(data));
      let tempRet = [];
      this.events = [];
      console.log('get Food Plans', data);

      data.forEach((x) => {
        if (tempRet.filter((a) => { return a.TimeSlot == x.TimeSlot && a.DeleveryDate == x.DeleveryDate }).length > 0) {
          tempRet.forEach((q) => {
            if (q.TimeSlot == x.TimeSlot && q.DeleveryDate == x.DeleveryDate) {
              q.FoodItemName = q.FoodItemName + ', ' + x.FoodItemName + ' (' + x.Count + ' ' + x.CountType + ')'
            }
          });
        }
        else {
          x.FoodItemName = x.FoodItemName + ' (' + x.Count + ' ' + x.CountType + ')'
          tempRet.push(x);
        }
      })

      for (var i = 0; i < tempRet.length; i++) {
        let j = {
          start: new Date(tempRet[i].DeleveryDate),
          end: new Date(tempRet[i].DeleveryDate),
          title: (tempRet[i].TimeSlot == "B" ? '[Breack Fast] ' : tempRet[i].TimeSlot == "L" ? '[Lunch] ' : tempRet[i].TimeSlot == "D" ? '[Dinner] ' : '') + tempRet[i].FoodItemName,
          color: tempRet[i].TimeSlot == "B" ? this.BLD.breackfast : tempRet[i].TimeSlot == "L" ? this.BLD.lunch : tempRet[i].TimeSlot == "D" ? this.BLD.dinner : this.BLD.dinner,
        }
        this.events.push(j);
      }
      this.loadDayFoodPlans();
    }, (error) => {
      console.log(error);
    });

  }

  loadDayFoodPlans() {
    // to generate data of detail table

    let tempTodayFoodPlan = [];
    this.thisMonthFoodPlan.forEach((x) => {
      if (new Date(x.DeleveryDate).toDateString() == this.viewDate.toDateString()) {
        tempTodayFoodPlan.push(x);
        console.log(x)
      }
    })

    this.todayFoodPlans = [];
    tempTodayFoodPlan.forEach((x) => {
      if (this.todayFoodPlans.filter((a) => { return a.TimeSlot == x.TimeSlot && a.DeleveryDate == x.DeleveryDate }).length > 0) {
        this.todayFoodPlans.forEach((q) => {

          if (q.TimeSlot == x.TimeSlot && q.DeleveryDate == x.DeleveryDate) {
            q.FoodItems.push({
              Count: x.Count, CountType: x.CountType, Currency: x.Currency, DeleveredTo: x.DeleveredTo, DeleveryStatus: x.DeleveryStatus, Details: x.Details,
              FoodItemName: x.FoodItemName, Location: x.Location, PaymentStatus: x.PaymentStatus, PendingAmount: x.PendingAmount,
              PricePerPice: x.PricePerPice, TotelPrice: x.TotelPrice
            });
          }

        });
      }
      else {
        let tempdata = {
          TimeSlot: x.TimeSlot, DeleveryDate: x.DeleveryDate, TotelPriceOfDelevery: 0, Currency: x.Currency,
          FoodItems: [{
            Count: x.Count, CountType: x.CountType, Currency: x.Currency, DeleveredTo: x.DeleveredTo, DeleveryStatus: x.DeleveryStatus, Details: x.Details,
            FoodItemName: x.FoodItemName, Location: x.Location, PaymentStatus: x.PaymentStatus, PendingAmount: x.PendingAmount,
            PricePerPice: x.PricePerPice, TotelPrice: x.TotelPrice
          }]
        };
        this.todayFoodPlans.push(tempdata);
      }
    });

    this.todayFoodPlans.forEach((x) => {
      x.FoodItems.forEach((j) => {
        x.TotelPriceOfDelevery = x.TotelPriceOfDelevery + j.TotelPrice
      });
    });

    console.log('todayFoodPlans', this.todayFoodPlans);
  }
}


