import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExampleHomeComponent } from './test-example-home.component';

describe('TestExampleHomeComponent', () => {
  let component: TestExampleHomeComponent;
  let fixture: ComponentFixture<TestExampleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExampleHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestExampleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
