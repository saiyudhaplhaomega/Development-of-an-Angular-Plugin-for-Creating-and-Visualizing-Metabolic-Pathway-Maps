import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDisplayingComponent } from './result-displaying.component';

describe('ResultDisplayingComponent', () => {
  let component: ResultDisplayingComponent;
  let fixture: ComponentFixture<ResultDisplayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDisplayingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultDisplayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
