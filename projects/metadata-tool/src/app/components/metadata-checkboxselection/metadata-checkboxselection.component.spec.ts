import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';

describe('MetaDataCheckboxSelectionComponent', () => {
  let component: MetaDataCheckboxSelectionComponent;
  let fixture: ComponentFixture<MetaDataCheckboxSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaDataCheckboxSelectionComponent]
    });
    fixture = TestBed.createComponent(MetaDataCheckboxSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
