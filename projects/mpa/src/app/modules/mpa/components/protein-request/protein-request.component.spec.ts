import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinRequestComponent } from './protein-request.component';

describe('ProteinRequestComponent', () => {
  let component: ProteinRequestComponent;
  let fixture: ComponentFixture<ProteinRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinRequestComponent]
    });
    fixture = TestBed.createComponent(ProteinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
