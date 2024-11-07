import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCanvasComponent } from './network-canvas.component';

describe('NetworkCanvasComponent', () => {
  let component: NetworkCanvasComponent;
  let fixture: ComponentFixture<NetworkCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkCanvasComponent]
    });
    fixture = TestBed.createComponent(NetworkCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
