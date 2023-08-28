import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneHelpComponent } from './prophane-help.component';

describe('ProphaneHelpComponent', () => {
  let component: ProphaneHelpComponent;
  let fixture: ComponentFixture<ProphaneHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProphaneHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProphaneHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
