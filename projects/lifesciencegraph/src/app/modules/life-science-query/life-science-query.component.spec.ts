import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeScienceQueryComponent } from './life-science-query.component';

describe('LifeScienceQueryComponent', () => {
  let component: LifeScienceQueryComponent;
  let fixture: ComponentFixture<LifeScienceQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeScienceQueryComponent]
    });
    fixture = TestBed.createComponent(LifeScienceQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
