import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IDevice } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = environment.apiUrl + 'PeripheralDevices'

  constructor(private http: HttpClient) {}

  public getDevices(): Observable<IDevice[]> {
    return this.http.get<IDevice[]>(this.apiUrl)
  }

  public insertDevice(device: IDevice) {
    return this.http.post(this.apiUrl, device)
  }
  public deleteDevice(deviceId: number) {
    return this.http.delete(`${this.apiUrl}/${deviceId}`)
  }

  public updateDevice(device: IDevice) {
    return this.http.put(`${this.apiUrl}/${device.id}`, device)
  }
}
