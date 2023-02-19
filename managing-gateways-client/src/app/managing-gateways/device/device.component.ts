import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import { IPaginate } from 'src/app/shared/interfaces/pagination.interface'
import { IAppState } from 'src/app/store'
import Swal from 'sweetalert2'
import { IDevice } from '../interfaces'
import { deviceDelete, invokeDeviceAPI } from '../store/gateway.action'
import { selectDevices } from '../store/gateway.selector'
import { DeviceUpdateComponent } from './device-update/device-update.component'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['UID', 'Vendor', 'Date', 'Status', 'Actions']

  public devices: IDevice[] = []
  public totalAmoutOfRecords: any

  public paginationDto = {} as IPaginate
  public currentPage = 1
  public pageSize = 5

  private destroy$: Subject<void> = new Subject<void>()

  constructor(private store: Store<IAppState>, public dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public ngOnInit(): void {
    this.store.dispatch(invokeDeviceAPI())
    this.loadDevices()
  }

  public updateDevice(device: IDevice): void {
    this.dialog.open(DeviceUpdateComponent, {
      data: device,
      width: '80%',
      height: '60%',
    })
  }

  public deleteDevice(device: IDevice): void {
    Swal.fire({
      title: 'Delete Record',
      text: 'Do you want to delete this record',
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((action) => {
      if (action.isConfirmed) {
        this.store.dispatch(deviceDelete({ id: device.id || 0 }))
      }
    })
  }

  public updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1
    this.pageSize = event.pageSize
  }

  private loadDevices(): void {
    this.store
      .select(selectDevices)
      .pipe(takeUntil(this.destroy$))
      .subscribe((devicesList?: IDevice[]) => {
        this.devices = devicesList ? devicesList : []
      })
  }
}
