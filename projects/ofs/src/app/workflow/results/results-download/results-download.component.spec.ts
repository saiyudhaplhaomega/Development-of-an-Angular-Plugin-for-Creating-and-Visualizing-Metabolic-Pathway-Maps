import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsDownloadComponent } from './results-download.component';

describe('ResultsDownloadComponent', () => {
  let component: ResultsDownloadComponent;
  let fixture: ComponentFixture<ResultsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
