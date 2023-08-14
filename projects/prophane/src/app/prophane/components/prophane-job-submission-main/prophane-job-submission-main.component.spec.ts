import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneJobSubmissionMainComponent } from './prophane-job-submission-main.component';

describe('ProphaneJobSubmissionMainComponent', () => {
  let component: ProphaneJobSubmissionMainComponent;
  let fixture: ComponentFixture<ProphaneJobSubmissionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProphaneJobSubmissionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProphaneJobSubmissionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
