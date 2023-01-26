import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcaComponent } from './pca.component';

describe('PcaComponent', () => {
  let component: PcaComponent;
  let fixture: ComponentFixture<PcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
