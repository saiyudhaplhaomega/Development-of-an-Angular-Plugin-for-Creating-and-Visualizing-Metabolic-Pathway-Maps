import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteineSequenceViewerComponent } from './proteine-sequence-viewer.component';

describe('PeptideSequenceViewerComponent', () => {
  let component: ProteineSequenceViewerComponent;
  let fixture: ComponentFixture<ProteineSequenceViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteineSequenceViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteineSequenceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
