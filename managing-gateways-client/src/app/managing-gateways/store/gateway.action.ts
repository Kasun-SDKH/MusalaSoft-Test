import { createAction, props } from '@ngrx/store'
import { IDevice, IGateWay } from '../interfaces'

export const invokeDeviceAPI = createAction('[Gateway] invoke device API')

export const setDeviceList = createAction(
  '[Gateway] set device list',
  props<{ devices: IDevice[] }>(),
)

export const insertDevice = createAction(
  '[Gateway] insert device ',
  props<{ devices: IDevice }>(),
)

export const deviceAPIInvokeSuccess = createAction(
  '[Gateway] api success device ',
  props<{ isSuccess: Boolean }>(),
)

export const updateDevice = createAction(
  '[Gateway] update device ',
  props<{ device: IDevice }>(),
)

export const deviceDelete = createAction(
  '[Gateway] api delete device ',
  props<{ id: number }>(),
)

// actions for the gateway

export const invokeGatewayAPI = createAction('[Gateway] invoke gateway API')

export const setGatewaylist = createAction(
  '[Gateway] set device list',
  props<{ gateways: IGateWay[] }>(),
)

export const insertGateway = createAction(
  '[Gateway] insert gateway ',
  props<{ gateway: IGateWay }>(),
)

export const gatewayAPIInvokeSuccess = createAction(
  '[Gateway] api success gateway ',
  props<{ isSuccess: Boolean }>(),
)

export const updateGateway = createAction(
  '[Gateway] update gateway ',
  props<{ gateway: IGateWay }>(),
)

export const gatewayDelete = createAction(
  '[Gateway] api delete gateway ',
  props<{ id: number }>(),
)
