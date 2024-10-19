import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularEditingComponent } from './molecular-editing.component';

describe('MolecularEditingComponent', () => {
  let component: MolecularEditingComponent;
  let fixture: ComponentFixture<MolecularEditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolecularEditingComponent]
    });
    fixture = TestBed.createComponent(MolecularEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
