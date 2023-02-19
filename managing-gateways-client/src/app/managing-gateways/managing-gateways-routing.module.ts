import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DeviceComponent } from './device/device.component'
import { GatewayComponent } from './gateway/gateway.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'gateways', component: GatewayComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagingGatewaysRoutingModule {}
