import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import { IPaginate } from 'src/app/shared/interfaces/pagination.interface'
import Swal from 'sweetalert2'
import { IGateWay } from '../interfaces'
import {
  gatewayDelete,
  invokeDeviceAPI,
  invokeGatewayAPI,
} from '../store/gateway.action'
import { selectGateways } from '../store/gateway.selector'
import { GatewayUpdateComponent } from './gateway-update/gateway-update.component'

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss'],
})
export class GatewayComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['SerialNo', 'Name', 'IP', 'Device', 'Actions']

  public gateways: IGateWay[] = []
  public totalAmoutOfRecords: any

  public paginationDto = {} as IPaginate
  public currentPage = 1
  public pageSize = 5

  private destroy$: Subject<void> = new Subject<void>()

  constructor(private store: Store, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.store.dispatch(invokeDeviceAPI())
    this.store.dispatch(invokeGatewayAPI())
    this.loadGateways()
  }
  public updateGateway(gateway: IGateWay): void {
    this.store.dispatch(invokeDeviceAPI())
    this.dialog.open(GatewayUpdateComponent, {
      data: gateway,
      width: '80%',
      height: '60%',
    })
  }

  public deleteGateway(gateway: IGateWay): void {
    Swal.fire({
      title: 'Delete Record',
      text: 'Do you want to delete this record',
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((action) => {
      if (action.isConfirmed) {
        this.store.dispatch(gatewayDelete({ id: gateway.id || 0 }))
        this.store.dispatch(invokeGatewayAPI())
      }
    })
  }

  public updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1
    this.pageSize = event.pageSize
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadGateways(): void {
    this.store
      .select(selectGateways)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gateWayList?: IGateWay[]) => {
        if (gateWayList) {
          this.gateways = gateWayList
        }
      })
  }
}
