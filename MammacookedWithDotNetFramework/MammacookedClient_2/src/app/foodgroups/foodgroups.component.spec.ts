import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodgroupsComponent } from './foodgroups.component';

describe('FoodgroupsComponent', () => {
  let component: FoodgroupsComponent;
  let fixture: ComponentFixture<FoodgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
