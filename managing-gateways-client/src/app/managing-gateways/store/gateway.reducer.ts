import { createReducer, on } from '@ngrx/store'
import { IDevice, IGateWay } from '../interfaces'
import * as actions from './gateway.action'

export const gatewayFeatureKey = 'Gateway'

export interface IGateWayStore {
  devices?: IDevice[]
  gateways?: IGateWay[]
}

const initialState: IGateWayStore = {
  devices: [],
}

export const gatewayReducer = createReducer(
  initialState,
  on(actions.setDeviceList, (state: IGateWayStore, { devices }) => {
    const currentState: IGateWayStore = { ...state }
    currentState.devices = devices
    return currentState
  }),

  on(actions.setGatewaylist, (state: IGateWayStore, { gateways }) => {
    const currentState: IGateWayStore = { ...state }
    currentState.gateways = gateways
    return currentState
  }),
)
