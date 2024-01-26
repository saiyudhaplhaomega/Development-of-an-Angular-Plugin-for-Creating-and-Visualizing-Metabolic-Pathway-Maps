import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedotoneComponent } from './onedotone.component';

describe('OnedotoneComponent', () => {
  let component: OnedotoneComponent;
  let fixture: ComponentFixture<OnedotoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnedotoneComponent]
    });
    fixture = TestBed.createComponent(OnedotoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
