import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDataTableComponent } from './network-data-table.component';

describe('NetworkDataTableComponent', () => {
  let component: NetworkDataTableComponent;
  let fixture: ComponentFixture<NetworkDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkDataTableComponent]
    });
    fixture = TestBed.createComponent(NetworkDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
