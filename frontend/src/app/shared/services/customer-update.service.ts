import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerUpdateRequest } from '../models/customer/customerUpdateRequest';
import { CustomerUpdateResponse } from '../models/customer/customerUpdateResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerUpdateService {

  constructor(private httpClient: HttpClient) {}

  private readonly controllerUrl = 'http://localhost:8081/api/customers/contactinformations';


  updateCustomer(customerUpdateRequest : CustomerUpdateRequest): Observable<CustomerUpdateResponse>{
    const url = `${this.controllerUrl}/${customerUpdateRequest.id}`;
    return this.httpClient.put<CustomerUpdateResponse>(url,customerUpdateRequest);
  }
}
