import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagingGatewaysRoutingModule } from './managing-gateways-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DeviceComponent } from './device/device.component'
import { GatewayComponent } from './gateway/gateway.component'
import { DeviceFormComponent } from './device/device-form/device-form.component'
import { DeviceInsertComponent } from './device/device-insert/device-insert.component'
import { DeviceUpdateComponent } from './device/device-update/device-update.component'
import { MaterialModule } from '../material/material.module'
import { SharedModule } from '../shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { gatewayFeatureKey, gatewayReducer } from './store/gateway.reducer'
import { EffectsModule } from '@ngrx/effects'
import { GatewayEffect } from './store/gateway.effect';
import { GatewayFormComponent } from './gateway/gateway-form/gateway-form.component';
import { GatewayInsertComponent } from './gateway/gateway-insert/gateway-insert.component';
import { GatewayUpdateComponent } from './gateway/gateway-update/gateway-update.component'

@NgModule({
  declarations: [
    DashboardComponent,
    DeviceComponent,
    GatewayComponent,
    DeviceFormComponent,
    DeviceInsertComponent,
    DeviceUpdateComponent,
    GatewayFormComponent,
    GatewayInsertComponent,
    GatewayUpdateComponent,
  ],
  imports: [
    CommonModule,
    ManagingGatewaysRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(gatewayFeatureKey, gatewayReducer),
    EffectsModule.forFeature([GatewayEffect]),
  ],
})
export class ManagingGatewaysModule {}
