import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataUploadpageComponent } from './metadata-uploadpage.component';

describe('MetadataUploadpageComponent', () => {
  let component: MetadataUploadpageComponent;
  let fixture: ComponentFixture<MetadataUploadpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataUploadpageComponent]
    });
    fixture = TestBed.createComponent(MetadataUploadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
