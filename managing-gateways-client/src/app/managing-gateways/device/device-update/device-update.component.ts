import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store'
import { IDevice } from '../../interfaces'
import { updateDevice } from '../../store/gateway.action'

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.scss'],
})
export class DeviceUpdateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDevice,
    public dialogRef: MatDialogRef<DeviceUpdateComponent>,
    private store: Store<IAppState>,
  ) {}

  public updateRecord(devicedata: IDevice): void {
    this.store.dispatch(updateDevice({ device: devicedata }))
    this.dialogRef.close()
  }
}
