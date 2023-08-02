import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfsLandingPageComponent } from './ofs-landing-page.component';

describe('OfsLandingPageComponent', () => {
  let component: OfsLandingPageComponent;
  let fixture: ComponentFixture<OfsLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfsLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
