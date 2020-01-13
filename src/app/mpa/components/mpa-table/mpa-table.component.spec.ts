import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpaTableComponent } from './mpa-table.component';

describe('MpaTableComponent', () => {
  let component: MpaTableComponent;
  let fixture: ComponentFixture<MpaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
