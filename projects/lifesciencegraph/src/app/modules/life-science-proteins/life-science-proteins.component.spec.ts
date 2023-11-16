import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeScienceProteinsComponent } from './life-science-proteins.component';

describe('LifeScienceProteinsComponent', () => {
  let component: LifeScienceProteinsComponent;
  let fixture: ComponentFixture<LifeScienceProteinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeScienceProteinsComponent]
    });
    fixture = TestBed.createComponent(LifeScienceProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
