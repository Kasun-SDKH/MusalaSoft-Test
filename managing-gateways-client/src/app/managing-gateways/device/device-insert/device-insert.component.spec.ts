import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInsertComponent } from './device-insert.component';

describe('DeviceInsertComponent', () => {
  let component: DeviceInsertComponent;
  let fixture: ComponentFixture<DeviceInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
