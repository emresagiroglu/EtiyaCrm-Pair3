import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerCncRequest } from '../../models/customer/customerCncRequest';
import { Observable } from 'rxjs';
import { CustomerCncResponse } from '../../models/customer/customerCncResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerCncService {

  constructor(private httpClient : HttpClient) { }
  private readonly controllerUrl = 'http://localhost:8081/api/customers'


  createCncInfo(customerCncRequest : CustomerCncRequest) : Observable<CustomerCncResponse>
  {
    const url = `${this.controllerUrl}/contactinformations`;
    return this.httpClient.post<CustomerCncResponse>(url,customerCncRequest)
  }
}
