import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneViewerComponent } from './prophane-viewer.component';

describe('ProphaneViewerComponent', () => {
  let component: ProphaneViewerComponent;
  let fixture: ComponentFixture<ProphaneViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProphaneViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProphaneViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
