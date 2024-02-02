import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperResultsComponent } from './wrapper-results.component';

describe('WrapperResultsComponent', () => {
  let component: WrapperResultsComponent;
  let fixture: ComponentFixture<WrapperResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
