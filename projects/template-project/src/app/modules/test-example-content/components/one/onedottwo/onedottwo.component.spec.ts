import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedottwoComponent } from './onedottwo.component';

describe('OnedottwoComponent', () => {
  let component: OnedottwoComponent;
  let fixture: ComponentFixture<OnedottwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnedottwoComponent]
    });
    fixture = TestBed.createComponent(OnedottwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
