import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerListResponse } from '../models/customer/customerListResponse';
import { CustomerSearchResponse } from '../models/customer/customerSearchResponse';
import { CustomerSearchRequest } from '../models/customer/customerSearchRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {

  constructor(private httpClient: HttpClient) { }

  private readonly controllerUrl= 'http://localhost:8085/api/search'  //sonradan apigateway e bağlanacak!

  getCustomers(): Observable<CustomerListResponse[]>{
    const url = `${this.controllerUrl}/getAll`; 
    return this.httpClient.get<CustomerListResponse[]>(url);
  }

  searchCustomer(customerSearchRequest: CustomerSearchRequest): Observable<any> {
    let params = new HttpParams();


    if (customerSearchRequest.nationalityId) params = params.set('nationalityId', customerSearchRequest.nationalityId);
    if (customerSearchRequest.id) params = params.set('id', customerSearchRequest.id);
    if (customerSearchRequest.accountNumber) params = params.set('accountNumber', customerSearchRequest.accountNumber);
    if (customerSearchRequest.mobilePhone) params = params.set('mobilePhone', customerSearchRequest.mobilePhone);
    if (customerSearchRequest.firstName) params = params.set('firstName', customerSearchRequest.firstName);
    if (customerSearchRequest.lastName) params = params.set('lastName', customerSearchRequest.lastName);
    if (customerSearchRequest.orderNumber) params = params.set('orderNumber', customerSearchRequest.orderNumber);
    if (customerSearchRequest.sortField) params = params.set('sortField', customerSearchRequest.sortField);
    if (customerSearchRequest.sortOrder) params = params.set('sortOrder', customerSearchRequest.sortOrder);

    return this.httpClient.get<CustomerSearchResponse[]>(this.controllerUrl, { params });
  }


}
