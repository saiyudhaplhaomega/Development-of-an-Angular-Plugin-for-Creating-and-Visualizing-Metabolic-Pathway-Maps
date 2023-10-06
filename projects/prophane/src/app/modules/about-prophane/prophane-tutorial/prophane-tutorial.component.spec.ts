import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneTutorialComponent } from './prophane-tutorial.component';

describe('ProphaneTutorialComponent', () => {
  let component: ProphaneTutorialComponent;
  let fixture: ComponentFixture<ProphaneTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProphaneTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProphaneTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
