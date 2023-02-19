import { createFeatureSelector, createSelector } from '@ngrx/store'
import { gatewayFeatureKey, IGateWayStore } from './gateway.reducer'

export const selectGatewayStore = createFeatureSelector<IGateWayStore>(
  gatewayFeatureKey,
)

export const selectDevices = createSelector(
  selectGatewayStore,
  (gatewayStore: IGateWayStore) => gatewayStore?.devices,
)

export const selectGateways = createSelector(
  selectGatewayStore,
  (gatewayStore: IGateWayStore) => gatewayStore?.gateways,
)
