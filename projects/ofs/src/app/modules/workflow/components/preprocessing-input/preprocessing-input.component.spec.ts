import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessingInputComponent } from './preprocessing-input.component';

describe('PreprocessingInputComponent', () => {
  let component: PreprocessingInputComponent;
  let fixture: ComponentFixture<PreprocessingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreprocessingInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreprocessingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
