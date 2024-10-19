import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularExplorationComponent } from './molecular-exploration.component';

describe('MolecularExplorationComponent', () => {
  let component: MolecularExplorationComponent;
  let fixture: ComponentFixture<MolecularExplorationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolecularExplorationComponent]
    });
    fixture = TestBed.createComponent(MolecularExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
