import { IDeviceForGateWays } from './device-for-gateways.interface'

export interface IGateWay {
  id?: number
  serialNo: string
  name: string
  ipAddress: string
  devicesForGateWays: IDeviceForGateWays[]
}
