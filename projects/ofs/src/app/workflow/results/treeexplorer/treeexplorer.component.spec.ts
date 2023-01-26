import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeexplorerComponent } from './treeexplorer.component';

describe('TreeexplorerComponent', () => {
  let component: TreeexplorerComponent;
  let fixture: ComponentFixture<TreeexplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeexplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
