import { CustomerGetByIdResponse } from './../../models/customer/customerGetByIdResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerCreateRequest } from '../../models/customer/customerCreateRequest';
import { CustomerCreateResponse } from '../../models/customer/customerCreateResponse';
import { CncInfoCreateRequest } from '../../models/cnc-info/cncInfoCreateRequest';
import { CustomerGetByIdRequest } from '../../models/customer/customerGetByIdRequest';
import { CustomerUpdateRequest } from '../../models/customer/customerUpdateRequest';
import { CustomerUpdateResponse } from '../../models/customer/customerUpdateResponse';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private formData : any = {}
  customerId !: number;

  constructor(private httpClient : HttpClient) { }

  private readonly controllerUrl = 'http://localhost:8081/api/customers/individual';

  deleteCustomer(customerId: number) : Observable<void>
  {
    const url = `${this.controllerUrl}/${customerId}`;
    return this.httpClient.delete<void>(url);
  }

  createCustomer(customerCreateRequest : CustomerCreateRequest): Observable<CustomerCreateResponse>
  {
    return this.httpClient.post<CustomerCreateResponse>(this.controllerUrl,customerCreateRequest);
  }

  updateCustomer(customerUpdateRequest : CustomerUpdateRequest,customerId : number) : Observable<CustomerUpdateResponse>
  {
    const url = `${this.controllerUrl}/${customerId}`;
    return this.httpClient.put<CustomerUpdateResponse>(url,customerUpdateRequest)
  }
  
  getCustomerById(customerGetByIdRequest: CustomerGetByIdRequest): Observable<CustomerGetByIdResponse> 
  {
    const url = `${this.controllerUrl}/${customerGetByIdRequest.id}`;
    return this.httpClient.get<CustomerGetByIdResponse>(url);
  }


  setFormData(data : any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }
}
