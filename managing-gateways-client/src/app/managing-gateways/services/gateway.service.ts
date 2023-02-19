import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IGateWay } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  private apiUrl = environment.apiUrl + 'ManagingGateway'

  constructor(private http: HttpClient) {}

  public getGateways(): Observable<IGateWay[]> {
    return this.http.get<IGateWay[]>(this.apiUrl)
  }

  public insertGateway(gateway: IGateWay) {
    return this.http.post(this.apiUrl, gateway)
  }
  public deleteGateway(gatewayId: number) {
    return this.http.delete(`${this.apiUrl}/${gatewayId}`)
  }

  public updateGateway(gateway: IGateWay) {
    return this.http.put(`${this.apiUrl}/${gateway.id}`, gateway)
  }
}
