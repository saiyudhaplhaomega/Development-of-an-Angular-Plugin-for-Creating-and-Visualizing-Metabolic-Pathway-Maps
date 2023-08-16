import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetadataWorkflowComponent } from './metadata-workflow.component';

describe('MetadataWorkflowComponent', () => {
  let component: MetadataWorkflowComponent;
  let fixture: ComponentFixture<MetadataWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
