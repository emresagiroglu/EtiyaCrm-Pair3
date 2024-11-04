import { NeighbourhoodRequest } from './../../models/customer/address/NeighbourhoodRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityRequest } from '../../models/customer/address/CityRequest';
import { CityResponse } from '../../models/customer/address/CityResponse';
import { DistrictRequest } from '../../models/customer/address/DistrictRequest';
import { DistrictResponse } from '../../models/customer/address/DistrictResponse';
import { NeighbourhoodResponse } from '../../models/customer/address/NeighbourhoodResponse';
import { AddressRequest } from '../../models/customer/address/AddressRequest';
import { AddressResponse } from '../../models/customer/address/AddressResponse';

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
