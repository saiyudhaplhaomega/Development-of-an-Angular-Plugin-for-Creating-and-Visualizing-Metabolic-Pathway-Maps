import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptideTableComponent } from './peptide-table.component';

describe('PeptideTableComponent', () => {
  let component: PeptideTableComponent;
  let fixture: ComponentFixture<PeptideTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeptideTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeptideTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
