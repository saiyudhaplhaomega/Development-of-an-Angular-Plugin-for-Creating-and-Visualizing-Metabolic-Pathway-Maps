import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsTabComponent } from './keywords-tab.component';

describe('KeywordsTabComponent', () => {
  let component: KeywordsTabComponent;
  let fixture: ComponentFixture<KeywordsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
