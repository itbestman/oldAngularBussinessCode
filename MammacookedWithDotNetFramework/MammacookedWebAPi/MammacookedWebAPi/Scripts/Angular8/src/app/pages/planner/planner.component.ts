import { Component, ViewChild } from '@angular/core';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { MammaService } from '../../mamma.service';
import { OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementRef } from '@angular/core';

import { DefaultFoodPlanner, OrderedItemsOfDate } from './planner.models';

@Component({
  selector: 'icons-cmp',
  moduleId: module.id,
  templateUrl: 'planner.component.html',
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class PlannerComponent implements OnInit {

  saveButtonDisableStatus = false;
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

  @ViewChild('content', { static: true }) modalContent: any;

  viewDate: Date = new Date();// current date of calender
  thisMonthFoodPlan = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  activeDayIsOpen: boolean = true;// black description pannel, giving hint about plan
  selectedDayForEditFoodPlan: string;// clicked date
  defauldFoodPlan: DefaultFoodPlanner[] = []; //only default food plance list [{Count: 3  CountType  :   "Bowl"  Currency  :   "INR"  Details  :   "sahi paneer"  FoodId  :   3  FoodItemName  :   "Paneer"  FoodtypeName  :   "Dinner"  PricePerPice  :   40  TotelPrice  :   120}]  myView = 'month';
  todayFoodPlans = [];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  defauldFoodPlanBreackFast = [];
  defauldFoodPlanLunct = [];
  defauldFoodPlanDinner = [];
  selectedFoodItemForBucket = {
    B: { FoodId: undefined },
    L: { FoodId: undefined },
    D: { FoodId: undefined }
  };

  orderingFoodItems: any = {
    B: [],
    L: [],
    D: []
  }
  constructor(private appService: MammaService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadForm();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, 'date');

    if (isSameMonth(date, this.viewDate)) {
      if (new Date() <= date) {
        this.selectedDayForEditFoodPlan = date.toDateString();
        this.modalService.open(this.modalContent, { size: 'xl' });
      }
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.loadDayFoodPlans();
      this.saveButtonDisableStatus = false;
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

  loadForm() {
    this.loadDefaultFoodsPlans()
    this.loadThisMonthFoodPlans()
  }

  loadDefaultFoodsPlans() {
    this.appService.getDefaultFoodPlans().subscribe((data: DefaultFoodPlanner[]) => {// default food plans
      console.log(data, 'defauldFoodPlan')
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
    this.orderingFoodItems = { B: [], L: [], D: [] };
    this.appService.getOrdersOfDate({ orderDate: this.viewDate.toLocaleDateString() }).subscribe((data) => {
      let orderItemsOfDate: OrderedItemsOfDate[] = JSON.parse(data);
      orderItemsOfDate.forEach(item => {


        if (item.TimeSlot == 'B') {
          this.orderingFoodItems.B.push(...this.defauldFoodPlan.filter(
            (x) => {
              return item.orderItem.map(x => { return x.ItemId }).includes(x.FoodId) && x.FoodtypeName == 'Breack Fast'
            }
          ))
          this.orderingFoodItems.B.map((oi) => {
            oi.Count =
              item.orderItem.filter((x) => { return x.ItemId == oi.FoodId })[0].Count;
          })

        } else if (item.TimeSlot == 'L') {
          this.orderingFoodItems.L.push(...this.defauldFoodPlan.filter(
            (x) => {
              return item.orderItem.map(x => { return x.ItemId }).includes(x.FoodId) && x.FoodtypeName == 'Lunch'
            }
          ))
          this.orderingFoodItems.L.map((oi) => {
            oi.Count =
              item.orderItem.filter((x) => { return x.ItemId == oi.FoodId })[0].Count;
          })

        } else if (item.TimeSlot == 'D') {
          this.orderingFoodItems.D.push(...this.defauldFoodPlan.filter(
            (x) => {
              return item.orderItem.map(x => { return x.ItemId }).includes(x.FoodId) && x.FoodtypeName == 'Dinner'
            }
          ))
          this.orderingFoodItems.D.map((oi) => {
            oi.Count =
              item.orderItem.filter((x) => { return x.ItemId == oi.FoodId })[0].Count
          })
        }

      });



      console.log(orderItemsOfDate, 'getOrderOfDate');
    });
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

  dropdownFoodSelect(item: DefaultFoodPlanner, BLD) {
    console.log('dropdonw food select ', item
    )
    if (BLD == 'B') {
      this.selectedFoodItemForBucket.B = item;
    }
    else if (BLD == 'L') {
      this.selectedFoodItemForBucket.L = item;
    }
    else if (BLD == 'D') {
      this.selectedFoodItemForBucket.D = item;
    }
  }

  moveToBasket(BLD) {
    if (BLD == 'B') {
      if (this.orderingFoodItems.B.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.B.FoodId }).length > 0) {
        this.orderingFoodItems.B.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.B.FoodId })[0].Count++;
        this.selectedFoodItemForBucket.B = { FoodId: undefined }
        return;
      }
      //this.orderingFoodItems.B.filter((x)=>{return x.ItemId==this.selectedFoodItemForBucket.B.id})
      this.orderingFoodItems.B.push(JSON.parse(JSON.stringify(this.selectedFoodItemForBucket.B)));
      this.selectedFoodItemForBucket.B = { FoodId: undefined }
    }
    else if (BLD == 'L') {
      if (this.orderingFoodItems.L.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.L.FoodId }).length > 0) {
        this.orderingFoodItems.L.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.L.FoodId })[0].Count++;
        this.selectedFoodItemForBucket.L = { FoodId: undefined }
        return;
      }
      this.orderingFoodItems.L.push(JSON.parse(JSON.stringify(this.selectedFoodItemForBucket.L)));
      this.selectedFoodItemForBucket.L = { FoodId: undefined }
    }
    else if (BLD == 'D') {
      if (this.orderingFoodItems.D.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.D.FoodId }).length > 0) {
        this.orderingFoodItems.D.filter((x) => { return x.FoodId == this.selectedFoodItemForBucket.D.FoodId })[0].Count++;
        this.selectedFoodItemForBucket.D = { FoodId: undefined }
        return;
      }
      this.orderingFoodItems.D.push(JSON.parse(JSON.stringify(this.selectedFoodItemForBucket.D)));
      this.selectedFoodItemForBucket.D = { FoodId: undefined }
    }
  }

  addItem(item) {
    item.Count++;
  }

  removeItem(item) {
    if (item.Count > 0) {
      item.Count--;
    }
  }

  totelBreakfast() {
    return this.orderingFoodItems.B.length == 0 ? 0
      : this.orderingFoodItems.B
        .map((xx) => { return parseInt(xx.Count) * parseFloat(xx.PricePerPice) })
        .reduce((a, b) => { return a + b; })
  }

  totelLunch() {
    return this.orderingFoodItems.L.length == 0 ? 0
      : this.orderingFoodItems.L
        .map((xx) => { return parseInt(xx.Count) * parseFloat(xx.PricePerPice) })
        .reduce((a, b) => { return a + b; })
  }

  totelDinner() {
    return this.orderingFoodItems.D.length == 0 ? 0 :
      this.orderingFoodItems.D
        .map((xx) => { return parseInt(xx.Count) * parseFloat(xx.PricePerPice) })
        .reduce((a, b) => { return a + b; })
  }

  total() {
    return this.totelBreakfast() + this.totelLunch() + this.totelDinner()
  }
  validateButton() {
    return this.orderingFoodItems.B.filter((x) => { return x.Count > 0 }).length == 0 &&
      this.orderingFoodItems.L.filter((x) => { return x.Count > 0 }).length == 0 &&
      this.orderingFoodItems.D.filter((x) => { return x.Count > 0 }).length == 0
  }

  onSaveFoodBasket() {
    // console.log(this.orderingFoodItems, 'orderingFoodItems');
    // console.log(this.temp,'temp');

    this.saveButtonDisableStatus = true;
    this.orderingFoodItems.OrderDate = this.viewDate.toLocaleDateString();

    this.appService.AddOrder(this.orderingFoodItems).subscribe((data) => {// default food plans
      console.log(data);
      this.saveButtonDisableStatus = false;
      this.appService.showNotification('info', 'Food plan updated')
      this.modalService.dismissAll();
      this.loadForm();
    }, (error) => {
      this.saveButtonDisableStatus = false;
      this.appService.showNotification('error', 'Unable to save your food plan. please try after some time')
      this.modalService.dismissAll();
      console.log(error);
      this.loadForm();
    });

  }

  emptyBucket() {
    this.orderingFoodItems = { B: [], L: [], D: [] };

    this.orderingFoodItems.OrderDate = this.viewDate.toLocaleDateString();
    this.appService.AddOrder(this.orderingFoodItems).subscribe((data) => {// default food plans
      this.appService.showNotification('info', 'Food plan updated')
      this.modalService.dismissAll();
      this.loadForm();
    }, (error) => {
      this.saveButtonDisableStatus = false;
      this.appService.showNotification('error', 'Unable to save your food plan. please try after some time')
      this.modalService.dismissAll();
      console.log(error);
      this.loadForm();
    });

  }

  applyDefaultPlan()
  {

  }

}


