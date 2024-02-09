import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaForgeComponent } from './metaforge.component';

describe('MetaForgeComponent', () => {
  let component: MetaForgeComponent;
  let fixture: ComponentFixture<MetaForgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaForgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaForgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
