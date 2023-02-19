import { Injectable } from '@angular/core'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import {
  catchError,
  EMPTY,
  map,
  switchMap,
  pipe,
  exhaustMap,
  of,
  zip,
} from 'rxjs'
import { IDevice, IGateWay } from '../interfaces'
import { DeviceService } from '../services/device.service'
import { GatewayService } from '../services/gateway.service'
import * as actions from './gateway.action'
import { selectDevices, selectGateways } from './gateway.selector'

@Injectable()
export class GatewayEffect {
  public insertDevice$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.insertDevice),
      switchMap((value) =>
        this.deviceService.insertDevice(value.devices).pipe(
          switchMap(() =>
            zip([of(value.devices), this.store.select(selectDevices)]),
          ),
          switchMap(([device, deviceList]) => {
            const newCloneDeviceList = deviceList
              ? [...deviceList, device]
              : [...[], device]
            return [
              actions.setDeviceList({ devices: newCloneDeviceList }),
              actions.deviceAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.deviceAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public deleteDevice$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.deviceDelete),
      switchMap((value) =>
        this.deviceService.deleteDevice(value.id).pipe(
          switchMap(() =>
            zip([of(value.id), this.store.select(selectDevices)]),
          ),
          switchMap(([id, deviceList]) => {
            let newCloneDeviceList = deviceList ? [...deviceList] : []

            if (newCloneDeviceList.length > 0) {
              newCloneDeviceList = newCloneDeviceList.filter(
                (device: IDevice) => device.id !== id,
              )
            }

            return [
              actions.setDeviceList({ devices: newCloneDeviceList }),
              actions.deviceAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.deviceAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public updateDevice$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.updateDevice),
      switchMap((value) =>
        this.deviceService.updateDevice(value.device).pipe(
          switchMap(() =>
            zip([of(value.device), this.store.select(selectDevices)]),
          ),
          switchMap(([device, deviceList]) => {
            let newCloneDeviceList = deviceList ? [...deviceList] : []

            if (newCloneDeviceList.length > 0) {
              newCloneDeviceList.map((mapDevice, index) => {
                if (mapDevice.id === device.id) {
                  newCloneDeviceList[index] = device
                }
              })
            }

            return [
              actions.setDeviceList({ devices: newCloneDeviceList }),
              actions.deviceAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.deviceAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public deviceListRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.invokeDeviceAPI),
      concatLatestFrom(() => this.store.select(selectDevices)),
      switchMap(([, devicesList]) => {
        if (devicesList) {
          if (devicesList?.length > 0) {
            return EMPTY
          }
        }
        return this.deviceService.getDevices().pipe(
          map((devicesList: IDevice[]) => {
            return actions.setDeviceList({
              devices: devicesList,
            })
          }),
        )
      }),
    )
  })

  // effects for the gateways
  public insertGateway$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.insertGateway),
      switchMap((value) =>
        this.gateWayService.insertGateway(value.gateway).pipe(
          switchMap(() =>
            zip([of(value.gateway), this.store.select(selectGateways)]),
          ),
          switchMap(([gateway, gatewayList]) => {
            const newClonegatewayList = gatewayList
              ? [...gatewayList, gateway]
              : [...[], gateway]
            return [
              actions.setGatewaylist({ gateways: newClonegatewayList }),
              actions.gatewayAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.gatewayAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public gatewayDevice$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.gatewayDelete),
      switchMap((value) =>
        this.gateWayService.deleteGateway(value.id).pipe(
          switchMap(() =>
            zip([of(value.id), this.store.select(selectGateways)]),
          ),
          switchMap(([id, gatewayList]) => {
            let newClonegatewayList = gatewayList ? [...gatewayList] : []

            if (newClonegatewayList.length > 0) {
              newClonegatewayList = newClonegatewayList.filter(
                (gateway: IGateWay) => gateway.id !== id,
              )
            }

            return [
              actions.setGatewaylist({ gateways: newClonegatewayList }),
              actions.gatewayAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.gatewayAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public updateGateways$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.updateGateway),
      switchMap((value) =>
        this.gateWayService.updateGateway(value.gateway).pipe(
          switchMap(() =>
            zip([of(value.gateway), this.store.select(selectGateways)]),
          ),
          switchMap(([gateway, gatewaylist]) => {
            let newCloneGatewayList = gatewaylist ? [...gatewaylist] : []

            if (newCloneGatewayList.length > 0) {
              newCloneGatewayList.map((mapgateway, index) => {
                if (mapgateway.id === gateway.id) {
                  newCloneGatewayList[index] = gateway
                }
              })
            }

            return [
              actions.setGatewaylist({ gateways: newCloneGatewayList }),
              actions.gatewayAPIInvokeSuccess({ isSuccess: false }),
            ]
          }),
          catchError(() =>
            of(actions.gatewayAPIInvokeSuccess({ isSuccess: false })),
          ),
        ),
      ),
    )
  })

  public gatewaysListRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actions.invokeGatewayAPI),
      concatLatestFrom(() => this.store.select(selectGateways)),
      switchMap(([, gateWayList]) => {
        if (gateWayList) {
          if (gateWayList?.length > 0) {
            return EMPTY
          }
        }
        return this.gateWayService.getGateways().pipe(
          map((gateways: IGateWay[]) => {
            return actions.setGatewaylist({
              gateways: gateways,
            })
          }),
        )
      }),
    )
  })

  constructor(
    private action$: Actions,
    private deviceService: DeviceService,
    private gateWayService: GatewayService,
    private store: Store,
  ) {}
}
