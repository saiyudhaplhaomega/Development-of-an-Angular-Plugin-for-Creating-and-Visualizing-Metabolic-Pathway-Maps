import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeaklistPageComponent } from './peaklist-page.component';

describe('PeaklistComponent', () => {
  let component: PeaklistPageComponent;
  let fixture: ComponentFixture<PeaklistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeaklistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeaklistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
