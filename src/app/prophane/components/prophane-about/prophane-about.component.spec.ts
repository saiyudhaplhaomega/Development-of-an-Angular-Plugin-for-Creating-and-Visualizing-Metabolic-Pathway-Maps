import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProphaneAboutComponent } from './prophane-about.component';
import { ProphanePolicyConsentComponent } from '../prophane-policy-consent/prophane-policy-consent.component';


describe('ProphaneAboutComponent', () => {
  let component: ProphaneAboutComponent;
  let fixture: ComponentFixture<ProphaneAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProphaneAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProphaneAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
