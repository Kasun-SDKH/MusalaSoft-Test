import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayInsertComponent } from './gateway-insert.component';

describe('GatewayInsertComponent', () => {
  let component: GatewayInsertComponent;
  let fixture: ComponentFixture<GatewayInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
