import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareExperimentsDialogComponentComponent } from './compare-experiments-dialog-component.component';

describe('CompareExperimentsDialogComponentComponent', () => {
  let component: CompareExperimentsDialogComponentComponent;
  let fixture: ComponentFixture<CompareExperimentsDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareExperimentsDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareExperimentsDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
