import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataQuestPageComponent } from './metadata-quest-page.component';

describe('MetadataQuestPageComponent', () => {
  let component: MetadataQuestPageComponent;
  let fixture: ComponentFixture<MetadataQuestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataQuestPageComponent]
    });
    fixture = TestBed.createComponent(MetadataQuestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
