import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinTableComponent } from './protein-table.component';

describe('ProteinTableComponent', () => {
  let component: ProteinTableComponent;
  let fixture: ComponentFixture<ProteinTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
