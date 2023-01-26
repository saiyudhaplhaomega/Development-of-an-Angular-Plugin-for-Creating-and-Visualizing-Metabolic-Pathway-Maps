import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewResultsComponent } from './overview-results.component';

describe('OverviewResultsComponent', () => {
  let component: OverviewResultsComponent;
  let fixture: ComponentFixture<OverviewResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
