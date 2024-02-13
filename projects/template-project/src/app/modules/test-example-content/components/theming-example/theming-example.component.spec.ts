import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemingExampleComponent } from './theming-example.component';

describe('ThemingExampleComponent', () => {
  let component: ThemingExampleComponent;
  let fixture: ComponentFixture<ThemingExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemingExampleComponent]
    });
    fixture = TestBed.createComponent(ThemingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
