import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { IGateWay } from '../../interfaces'
import {
  insertGateway,
  invokeDeviceAPI,
  invokeGatewayAPI,
} from '../../store/gateway.action'

@Component({
  selector: 'app-gateway-insert',
  templateUrl: './gateway-insert.component.html',
  styleUrls: ['./gateway-insert.component.scss'],
})
export class GatewayInsertComponent implements OnInit {
  constructor(private store: Store) {}
  public ngOnInit(): void {
    this.store.dispatch(invokeDeviceAPI())
  }
  public saveRecord(gatewayValue: IGateWay): void {
    console.log(gatewayValue)
    this.store.dispatch(invokeGatewayAPI())
    this.store.dispatch(insertGateway({ gateway: gatewayValue }))
  }
}
