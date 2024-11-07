import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkVisualizationRootComponent } from './network-visualization-root.component';

describe('NetworkVisualizationRootComponent', () => {
  let component: NetworkVisualizationRootComponent;
  let fixture: ComponentFixture<NetworkVisualizationRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkVisualizationRootComponent]
    });
    fixture = TestBed.createComponent(NetworkVisualizationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
