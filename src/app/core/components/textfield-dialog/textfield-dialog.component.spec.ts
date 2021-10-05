import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldDialogComponent } from './textfield-dialog.component';

describe('TextfieldDialogComponent', () => {
  let component: TextfieldDialogComponent;
  let fixture: ComponentFixture<TextfieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextfieldDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
