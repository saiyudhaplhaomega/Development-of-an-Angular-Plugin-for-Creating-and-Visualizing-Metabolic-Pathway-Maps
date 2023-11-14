import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataUploadContainerComponent } from './metadata-uploadpage.component';

describe('MetadataUploadpageComponent', () => {
  let component: MetadataUploadContainerComponent;
  let fixture: ComponentFixture<MetadataUploadContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataUploadContainerComponent]
    });
    fixture = TestBed.createComponent(MetadataUploadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
