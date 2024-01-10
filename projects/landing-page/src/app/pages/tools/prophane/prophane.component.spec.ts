import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpaComponent } from './prophane.component';

describe('OfsMpaComponent', () => {
  let component: MpaComponent;
  let fixture: ComponentFixture<MpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
