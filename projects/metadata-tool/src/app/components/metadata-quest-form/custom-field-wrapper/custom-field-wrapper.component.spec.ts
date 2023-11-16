import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldWrapperComponent } from './custom-field-wrapper.component';

describe('CustomFieldWrapperComponent', () => {
  let component: CustomFieldWrapperComponent;
  let fixture: ComponentFixture<CustomFieldWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFieldWrapperComponent]
    });
    fixture = TestBed.createComponent(CustomFieldWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
