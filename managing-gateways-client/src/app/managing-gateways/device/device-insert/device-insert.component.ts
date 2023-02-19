import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store'
import { IDevice } from '../../interfaces'
import { insertDevice } from '../../store/gateway.action'

@Component({
  selector: 'app-device-insert',
  templateUrl: './device-insert.component.html',
  styleUrls: ['./device-insert.component.scss'],
})
export class DeviceInsertComponent {
  constructor(private store: Store<IAppState>) {}
  public saveDevice(device: IDevice): void {
    this.store.dispatch(insertDevice({ devices: device }))
  }
}
