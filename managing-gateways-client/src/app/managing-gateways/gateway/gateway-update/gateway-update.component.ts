import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store'
import { DeviceUpdateComponent } from '../../device/device-update/device-update.component'
import { IGateWay } from '../../interfaces'
import { invokeGatewayAPI, updateGateway } from '../../store/gateway.action'

@Component({
  selector: 'app-gateway-update',
  templateUrl: './gateway-update.component.html',
  styleUrls: ['./gateway-update.component.scss'],
})
export class GatewayUpdateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGateWay,
    public dialogRef: MatDialogRef<DeviceUpdateComponent>,
    private store: Store<IAppState>,
  ) {}

  public updateRecord(gatewayData: IGateWay): void {
    this.store.dispatch(updateGateway({ gateway: gatewayData }))
    this.store.dispatch(invokeGatewayAPI())
    this.dialogRef.close()
  }
}
