import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteingroupDetailViewComponent } from './proteingroup-detail-view.component';

describe('ProteingroupDetailViewComponent', () => {
  let component: ProteingroupDetailViewComponent;
  let fixture: ComponentFixture<ProteingroupDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteingroupDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteingroupDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
