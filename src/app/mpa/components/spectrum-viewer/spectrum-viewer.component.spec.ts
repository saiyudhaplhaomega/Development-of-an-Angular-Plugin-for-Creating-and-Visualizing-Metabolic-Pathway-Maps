import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumViewerComponent } from './spectrum-viewer.component';

describe('SpectrumViewerComponent', () => {
  let component: SpectrumViewerComponent;
  let fixture: ComponentFixture<SpectrumViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectrumViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
