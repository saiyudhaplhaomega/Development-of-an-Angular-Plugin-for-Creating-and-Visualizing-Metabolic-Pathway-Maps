import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyTabComponent } from './taxonomy-tab.component';

describe('TaxonomyTabComponent', () => {
  let component: TaxonomyTabComponent;
  let fixture: ComponentFixture<TaxonomyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonomyTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxonomyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
