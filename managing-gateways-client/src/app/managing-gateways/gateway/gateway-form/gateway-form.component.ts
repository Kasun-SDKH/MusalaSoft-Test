import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { delay, Subject, take, takeUntil } from 'rxjs'
import Swal from 'sweetalert2'
import { IDevice, IDeviceForGateWays, IGateWay } from '../../interfaces'
import { invokeDeviceAPI } from '../../store/gateway.action'
import { selectDevices } from '../../store/gateway.selector'

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.scss'],
})
export class GatewayFormComponent implements OnInit, OnDestroy {
  @Input()
  public gatewayData!: IGateWay

  public form!: FormGroup
  public isForUpdate: boolean = false

  @Output()
  public submitFormData = new EventEmitter<IGateWay>()

  private destroy$: Subject<void> = new Subject<void>()
  public deviceList: IDevice[] = []

  constructor(private formBuilder: FormBuilder, private store: Store) {}
  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public ngOnInit(): void {
    this.getDevicesList()
    this.form = this.formBuilder.group({
      id: [''],
      serialNo: ['', Validators.required],
      name: ['', Validators.required],
      ipAddress: [
        '',
        {
          validators: Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
            ),
          ]),
        },
      ],
      devices: ['', Validators.required],
    })

    if (this.gatewayData !== undefined) {
      this.setDataToUpdate()
    }
  }
  private getDevicesList() {
    this.store
      .select(selectDevices)
      .pipe(takeUntil(this.destroy$))
      .subscribe((devices?: IDevice[]) => {
        if (devices) {
          this.deviceList = devices
        }
      })
  }
  public submitDate(): void {
    const gateWayValues = {} as IGateWay

    const devicesForGateways: IDeviceForGateWays[] = this.getDevicesForGatewaysList(
      this.form.get('devices')?.value,
    )

    if (this.form.get('id')?.value !== '') {
      gateWayValues.id = this.form.get('id')?.value
    }
    gateWayValues.ipAddress = this.form.get('ipAddress')?.value
    gateWayValues.name = this.form.get('name')?.value
    gateWayValues.serialNo = this.form.get('ipAddress')?.value
    gateWayValues.devicesForGateWays = devicesForGateways

    this.submitFormData.emit(gateWayValues)
  }

  private getDevicesForGatewaysList(
    storedDevices: number[],
  ): IDeviceForGateWays[] {
    let devicesForGateways: IDeviceForGateWays[] = []

    let gateWayValue = {} as IDeviceForGateWays
    storedDevices.forEach((x) => {
      gateWayValue.deviceId = x
      devicesForGateways = [...devicesForGateways, gateWayValue]
    })

    return devicesForGateways
  }

  private setDataToUpdate() {
    this.isForUpdate = true
    this.form.patchValue(this.gatewayData)
    let deviceIdList: number[] = []
    this.gatewayData.devicesForGateWays.forEach((device) => {
      deviceIdList = [...deviceIdList, device.deviceId]
    })

    this.form.get('devices')?.setValue(deviceIdList)
  }
}
