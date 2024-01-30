import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTableComponent } from './feature-table.component';

describe('FeatureTableComponent', () => {
  let component: FeatureTableComponent;
  let fixture: ComponentFixture<FeatureTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureTableComponent]
    });
    fixture = TestBed.createComponent(FeatureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
