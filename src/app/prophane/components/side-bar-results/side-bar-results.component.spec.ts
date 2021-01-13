import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarResultsComponent } from './side-bar-results.component';

describe('SideBarResultsComponent', () => {
  let component: SideBarResultsComponent;
  let fixture: ComponentFixture<SideBarResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
