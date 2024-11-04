import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerCreateRequest } from '../../models/customer/customerCreateRequest';
import { Observable } from 'rxjs';
import { CustomerCreateResponse } from '../../models/customer/customerCreateResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreateService {

  constructor(private HttpClient: HttpClient) { }

  private readonly controllerUrl = 'http://localhost:8081/api/customers/individual'

  createCustomer(customerCreateRequest : CustomerCreateRequest): Observable<CustomerCreateResponse>
  {
    return this.HttpClient.post<CustomerCreateResponse>(this.controllerUrl,customerCreateRequest);
  }
}
