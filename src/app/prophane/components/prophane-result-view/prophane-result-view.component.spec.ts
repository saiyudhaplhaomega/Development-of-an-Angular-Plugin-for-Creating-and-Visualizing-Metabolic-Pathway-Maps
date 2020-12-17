import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneResultViewComponent } from './prophane-result-view.component';

describe('ProphaneResultViewComponent', () => {
  let component: ProphaneResultViewComponent;
  let fixture: ComponentFixture<ProphaneResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProphaneResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProphaneResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
