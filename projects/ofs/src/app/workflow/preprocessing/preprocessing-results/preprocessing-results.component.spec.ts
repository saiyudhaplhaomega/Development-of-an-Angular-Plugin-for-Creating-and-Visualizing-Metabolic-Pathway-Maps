import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessingResultsComponent } from './preprocessing-results.component';

describe('PreprocessingResultsComponent', () => {
  let component: PreprocessingResultsComponent;
  let fixture: ComponentFixture<PreprocessingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreprocessingResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreprocessingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
