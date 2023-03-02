import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInputComponent } from './guest-input.component';

describe('GuestInputComponent', () => {
  let component: GuestInputComponent;
  let fixture: ComponentFixture<GuestInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
