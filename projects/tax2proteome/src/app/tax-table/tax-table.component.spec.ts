import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTableComponent } from './tax-table.component';

describe('TaxTableComponent', () => {
  let component: TaxTableComponent;
  let fixture: ComponentFixture<TaxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
