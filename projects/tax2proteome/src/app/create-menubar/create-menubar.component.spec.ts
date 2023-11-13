import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenubarComponent } from './create-menubar.component';

describe('CreateMenubarComponent', () => {
  let component: CreateMenubarComponent;
  let fixture: ComponentFixture<CreateMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
