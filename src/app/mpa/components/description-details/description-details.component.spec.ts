import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDetailsComponent } from './description-details.component';

describe('DescriptionDetailsComponent', () => {
  let component: DescriptionDetailsComponent;
  let fixture: ComponentFixture<DescriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
