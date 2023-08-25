import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataDownloadpageComponent } from './metadata-downloadpage.component';

describe('MetadataDownloadpageComponent', () => {
  let component: MetadataDownloadpageComponent;
  let fixture: ComponentFixture<MetadataDownloadpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataDownloadpageComponent]
    });
    fixture = TestBed.createComponent(MetadataDownloadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
