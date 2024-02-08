import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateScriptComponent } from './template-script-page.component';

describe('TemplateScriptComponent', () => {
  let component: TemplateScriptComponent;
  let fixture: ComponentFixture<TemplateScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateScriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
