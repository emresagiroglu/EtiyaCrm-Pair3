import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CncInfoCreateResponse } from '../../models/cnc-info/cncInfoCreateResponse';
import { CncInfoUpdateRequest } from '../../models/cnc-info/cncInfoUpdateRequest';
import { CncInfoUpdateResponse } from '../../models/cnc-info/cncInfoUpdateResponse';
import { CncInfoCreateRequest } from '../../models/cnc-info/cncInfoCreateRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private httpClient: HttpClient) {}

  private readonly controllerUrl = 'http://localhost:8081/api/customers/contactinformations';


  updateCncInfo(cncInfoUpdateRequest : CncInfoUpdateRequest): Observable<CncInfoUpdateResponse>{
    const url = `${this.controllerUrl}/${cncInfoUpdateRequest.id}`;
    return this.httpClient.put<CncInfoUpdateResponse>(url,cncInfoUpdateRequest);
  }

  createCncInfo(cncInfoCreateRequest : CncInfoCreateRequest) : Observable<CncInfoCreateResponse>
  { 
    return this.httpClient.post<CncInfoCreateResponse>(this.controllerUrl,cncInfoCreateRequest)
  }
}
