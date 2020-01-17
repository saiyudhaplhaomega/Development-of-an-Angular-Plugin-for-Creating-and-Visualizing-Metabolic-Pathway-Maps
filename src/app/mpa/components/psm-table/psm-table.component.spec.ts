import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsmTableComponent } from './psm-table.component';

describe('PsmTableComponent', () => {
  let component: PsmTableComponent;
  let fixture: ComponentFixture<PsmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
