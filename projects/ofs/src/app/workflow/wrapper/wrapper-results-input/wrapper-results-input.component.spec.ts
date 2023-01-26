import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperResultsInputComponent } from './wrapper-results-input.component';

describe('WrapperResultsInputComponent', () => {
  let component: WrapperResultsInputComponent;
  let fixture: ComponentFixture<WrapperResultsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperResultsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperResultsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
