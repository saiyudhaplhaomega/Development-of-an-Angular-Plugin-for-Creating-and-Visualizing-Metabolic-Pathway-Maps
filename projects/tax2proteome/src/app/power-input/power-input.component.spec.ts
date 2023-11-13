import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerInputComponent } from './power-input.component';

describe('PowerInputComponent', () => {
  let component: PowerInputComponent;
  let fixture: ComponentFixture<PowerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
