import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceChartComponent } from './force-chart.component';

describe('ForceChartComponent', () => {
  let component: ForceChartComponent;
  let fixture: ComponentFixture<ForceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForceChartComponent]
    });
    fixture = TestBed.createComponent(ForceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
