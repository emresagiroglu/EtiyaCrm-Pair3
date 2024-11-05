import { NeighbourhoodRequest } from '../../models/address/NeighbourhoodRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityRequest } from '../../models/address/CityRequest';
import { CityResponse } from '../../models/address/CityResponse';
import { DistrictRequest } from '../../models/address/DistrictRequest';
import { DistrictResponse } from '../../models/address/DistrictResponse';
import { NeighbourhoodResponse } from '../../models/address/NeighbourhoodResponse';
import { AddressRequest } from '../../models/address/AddressRequest';
import { AddressResponse } from '../../models/address/AddressResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient : HttpClient) { }

  private readonly controllerUrl = 'http://localhost:8081/api/customers'


  createCity(cityRequest : CityRequest) : Observable<CityResponse>
  {
    const url = `${this.controllerUrl}/cities`;
    return this.httpClient.post<CityResponse>(url, cityRequest);
  }

  createDistrict(districtRequest: DistrictRequest) : Observable<DistrictResponse>
  {
    const url = `${this.controllerUrl}/districts`;
    return this.httpClient.post<DistrictResponse>(url, districtRequest);
  }
  createNeighbourhood(neighbourhoodRequest: NeighbourhoodRequest) : Observable<NeighbourhoodResponse>
  {
    const url = `${this.controllerUrl}/neighbourhoods`;
    return this.httpClient.post<NeighbourhoodResponse>(url, neighbourhoodRequest);
  }
  createAddress(addressRequest: AddressRequest) : Observable<AddressResponse>
  {
    const url = `${this.controllerUrl}/addresses`;
    return this.httpClient.post<AddressResponse>(url, addressRequest);
  }

  getAllAddressByCustomerId(customerId : number) : Observable<AddressResponse[]>
  {
    const url = `${this.controllerUrl}/addresses/customer/${customerId}`
    return this.httpClient.get<AddressResponse[]>(url);
  }

}
