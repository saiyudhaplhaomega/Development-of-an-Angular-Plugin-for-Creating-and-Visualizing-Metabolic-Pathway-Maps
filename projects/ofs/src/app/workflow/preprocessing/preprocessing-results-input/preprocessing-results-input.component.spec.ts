import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessingResultsInputComponent } from './preprocessing-results-input.component';

describe('PreprocessingResultsInputComponent', () => {
  let component: PreprocessingResultsInputComponent;
  let fixture: ComponentFixture<PreprocessingResultsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreprocessingResultsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreprocessingResultsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
