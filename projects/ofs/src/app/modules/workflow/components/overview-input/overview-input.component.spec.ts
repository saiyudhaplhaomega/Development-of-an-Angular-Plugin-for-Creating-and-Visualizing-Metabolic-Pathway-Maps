import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewInputComponent } from './overview-input.component';

describe('OverviewInputComponent', () => {
  let component: OverviewInputComponent;
  let fixture: ComponentFixture<OverviewInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
