import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeScienceHomeComponent } from './life-science-home.component';

describe('LifesciencehomeComponent', () => {
  let component: LifeScienceHomeComponent;
  let fixture: ComponentFixture<LifeScienceHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeScienceHomeComponent]
    });
    fixture = TestBed.createComponent(LifeScienceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
