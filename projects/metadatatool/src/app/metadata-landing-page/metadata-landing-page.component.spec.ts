import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataLandingPageComponent } from './metadata-landing-page.component';

describe('MetadataLandingPageComponent', () => {
  let component: MetadataLandingPageComponent;
  let fixture: ComponentFixture<MetadataLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
