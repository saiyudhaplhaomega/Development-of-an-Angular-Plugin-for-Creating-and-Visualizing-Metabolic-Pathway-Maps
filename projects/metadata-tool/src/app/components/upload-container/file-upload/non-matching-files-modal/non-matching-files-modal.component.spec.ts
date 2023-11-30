import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMatchingFilesModalComponent } from './non-matching-files-modal.component';

describe('NonMatchingFilesModalComponent', () => {
  let component: NonMatchingFilesModalComponent;
  let fixture: ComponentFixture<NonMatchingFilesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonMatchingFilesModalComponent]
    });
    fixture = TestBed.createComponent(NonMatchingFilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
