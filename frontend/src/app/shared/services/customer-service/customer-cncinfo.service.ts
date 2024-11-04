import { CustomerCncInfoRequest } from '../../models/customer/customerCncInfoRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerCncInfoResponse } from '../../models/customer/customerCncInfoResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerCncinfoService {

  constructor(private httpClient: HttpClient) {}

  private readonly controllerUrl = 'http://localhost:8081/api/customers/individual';

  getCustomerById(customerCncInfoRequest: CustomerCncInfoRequest): Observable<CustomerCncInfoResponse> {
    const url = `${this.controllerUrl}/${customerCncInfoRequest.id}`;
    return this.httpClient.get<CustomerCncInfoResponse>(url);
  }
}
