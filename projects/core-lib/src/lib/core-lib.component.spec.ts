import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLibComponent } from './core-lib.component';

describe('CoreLibComponent', () => {
  let component: CoreLibComponent;
  let fixture: ComponentFixture<CoreLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
