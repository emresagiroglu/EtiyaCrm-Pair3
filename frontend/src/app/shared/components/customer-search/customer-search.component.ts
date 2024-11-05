import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CustomerSearchService } from '../../services/customer-service/customer-search.service';
import { CustomerSearchResponse } from '../../models/customer/customerSearchResponse';
import { CustomerSearchRequest } from '../../models/customer/customerSearchRequest';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

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
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
})
export class CustomerSearchComponent implements OnInit {
  tabs: string[] = ['B2C', 'B2B'];

  showModal: boolean = false;
  showCustomerNotFound: boolean = false;

  searchResulDatas!: CustomerSearchResponse[];

  searchForm!: FormGroup;

  activeTab: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 5; // Sayfa başına gösterilecek eleman sayısı
  items = Array.from({ length: 50 }, (_, i) => `Item #${i + 1}`); // Örnek veri

  constructor(
    private formBuilder: FormBuilder,
    private customerSearchService: CustomerSearchService,
    private router: Router
  ) {}

  onPageChange(page: number) {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.buildForm();
    this.submitForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      nationalityId: ['', [this.numericValidator()]],
      id: ['', [this.numericValidator()]],
      accountNumber: ['', [this.numericValidator()]],
      mobilePhone: ['', [this.numericValidator()]],
      firstName: ['', [this.onlyTextValidator()]],
      middleName: ['', [this.onlyTextValidator()]],
      lastName: ['', [this.onlyTextValidator()]],
      orderNumber: [''],
      sortField: [''],
      sortOrder: [''],
    });
  }

  setSort(field: string, order: 'asc' | 'desc') {
    this.searchForm.patchValue({
      sortField: field,
      sortOrder: order,
    });
    this.submitForm();
  }

  submitForm() {
    this.searchForm.markAllAsTouched();
    if (!this.searchForm.valid) {
      return;
    }

    const customerSearchRequest: CustomerSearchRequest = this.searchForm.value;

    this.customerSearchService.searchCustomer(customerSearchRequest).subscribe({
      next: (response: CustomerSearchResponse[]) => {
        this.searchResulDatas = response;

        if (response.length === 0) {
          this.showModal = true;
        }
      },
    });
  }

  onlyTextValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isTextOnly = /^[a-zA-Z\s]*$/.test(control.value);
      return isTextOnly ? null : { onlyText: true };
    };
  }

  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNumeric = /^[0-9]*$/.test(control.value);
      return isNumeric ? null : { onlyNumeric: true };
    };
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  toggleModal() {
    this.showModal = !this.showModal;

    if (!this.showModal) {
      // Reset the search results when closing the modal
      this.searchResulDatas = [];
    }
  }

  handleButtonClick() {
    this.searchForm.reset();
  }

  goToCustomerCreate() {
    this.router.navigate(['/customer-create']);
  }

  showExitModal() {
    this.showCustomerNotFound = true;
  }

  closeExitModal() {
    this.showCustomerNotFound = false;
  }
}
