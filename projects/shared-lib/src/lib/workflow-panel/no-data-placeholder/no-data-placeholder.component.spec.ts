import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataPlaceholderComponent } from './no-data-placeholder.component';

describe('NoDataPlaceholderComponent', () => {
  let component: NoDataPlaceholderComponent;
  let fixture: ComponentFixture<NoDataPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoDataPlaceholderComponent]
    });
    fixture = TestBed.createComponent(NoDataPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
