import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExampleContentComponent } from './test-example-content.component';

describe('TestExampleContentComponent', () => {
  let component: TestExampleContentComponent;
  let fixture: ComponentFixture<TestExampleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExampleContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestExampleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
