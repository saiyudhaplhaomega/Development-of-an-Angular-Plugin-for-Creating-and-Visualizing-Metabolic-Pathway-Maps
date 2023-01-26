import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperControlButtonsComponent } from './stepper-control-buttons.component';

describe('StepperControlButtonsComponent', () => {
  let component: StepperControlButtonsComponent;
  let fixture: ComponentFixture<StepperControlButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperControlButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
