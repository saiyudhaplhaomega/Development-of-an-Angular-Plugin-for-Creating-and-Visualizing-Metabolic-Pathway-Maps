import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneJobControlComponent } from './prophane-job-control.component';

describe('ProphaneJobControlComponent', () => {
  let component: ProphaneJobControlComponent;
  let fixture: ComponentFixture<ProphaneJobControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProphaneJobControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProphaneJobControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
