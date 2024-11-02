import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSearchService } from '../../services/customer-search.service';
import { CustomerSearchResponse } from '../../models/customer/customerSearchResponse';
import { CustomerSearchRequest } from '../../models/customer/customerSearchRequest';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [
    TabsComponent,
    InputComponent,
    ButtonComponent,
    CustomerTableComponent,
    PopupComponent,
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
})
export class CustomerSearchComponent implements OnInit{
  tabs: string[] = ['B2C', 'B2B'];

  searchResulDatas! : CustomerSearchResponse[];

  searchForm !: FormGroup;

  activeTab: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private customerSearchService: CustomerSearchService
  ){}


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.searchForm = this.formBuilder.group({
      nationalityId: [''],
      id: [''],
      accountNumber: [''],
      mobilePhone: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      orderNumber: [''],
      sortField: [''],
      sortOrder: ['']
    });
  }

  submitForm(){
    this.searchForm.markAllAsTouched();
    if (!this.searchForm.valid) {
      return;
    }

    const customerSearchRequest: CustomerSearchRequest = this.searchForm.value;
    
    this.customerSearchService.searchCustomer(customerSearchRequest).subscribe({
      next: (response: CustomerSearchResponse[]) => {
        this.searchResulDatas = response;
      },
    });
  }


  setActiveTab(index: number) {
    this.activeTab = index;
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleButtonClick() {}
}
