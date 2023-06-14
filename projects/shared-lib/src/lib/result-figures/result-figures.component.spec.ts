import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFiguresComponent } from './result-figures.component';

describe('ResultDisplayingComponent', () => {
  let component: ResultFiguresComponent;
  let fixture: ComponentFixture<ResultFiguresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultFiguresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
