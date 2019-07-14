import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFyTabsComponent } from './ng-fy-tabs.component';

describe('NgFyTabsComponent', () => {
  let component: NgFyTabsComponent;
  let fixture: ComponentFixture<NgFyTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFyTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
