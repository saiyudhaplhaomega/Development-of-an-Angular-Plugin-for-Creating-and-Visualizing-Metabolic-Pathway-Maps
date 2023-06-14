import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsFigureComponent } from './results-figure.component';

describe('ResultsComponent', () => {
  let component: ResultsFigureComponent;
  let fixture: ComponentFixture<ResultsFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsFigureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
