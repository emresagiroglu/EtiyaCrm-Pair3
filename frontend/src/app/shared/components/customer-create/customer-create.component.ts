import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';
import { CustomerCreateRequest } from '../../models/customer/customerCreateRequest';
import { CustomerService } from '../../services/customer-service/customer.service';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonComponent,
    ButtonComponent,
    PopupComponent,
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup; 
  selectedOption: string = 'all'; 
  maxDate: string; 
  showExitPopup: boolean = false;
  showModal: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router,
     private customerService : CustomerService) {

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationality: [true],
      nationalityId: ['', [Validators.required, Validators.minLength(11)]],
    });
  }
  ngOnInit(): void {
 
    const savedForm = this.customerService.getFormData()
    if (savedForm) {
      this.customerForm.patchValue(savedForm.value)
    }

  }

  options = [
    { label: 'Turkish', value: 'all' },
    { label: 'Other', value: 'hide' },
  ];

  handleButtonClick() {
    //Form validation
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.showModal =true;
      return;
    }

    const savedForm = this.customerService.getFormData();
    console.log(savedForm);
  
    //If savedForm is empty, new customer is created
    if (!savedForm || Object.keys(savedForm).length === 0) {
      const customerCreateRequest: CustomerCreateRequest = this.customerForm.value;
      console.log("1");
      this.customerService.createCustomer(customerCreateRequest).subscribe({
        next: (response) => {
          this.customerService.customerId = response.id;
          this.customerService.setFormData(this.customerForm);
          console.log("2");
          this.router.navigate(['/address-info']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    //If savedForm is not empty and there is no update in the form, just redirect to the address information page
    else if (savedForm && !this.isFormUpdated()) {
      this.router.navigate(['/address-info']);
      console.log("3");
    }
    //If savedForm is full and there are changes to the form
    else if (savedForm && this.isFormUpdated()) {
      const customerUpdateRequest: CustomerCreateRequest = this.customerForm.value;
      const customerId = this.customerService.customerId;
      console.log("4");
      this.customerService.updateCustomer(customerUpdateRequest, customerId).subscribe({
        next: (response) => {
          this.customerService.setFormData(this.customerForm);
          this.router.navigate(['/address-info']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
  closeModal() {
    this.showModal = false;
  }

  navigateToCustomerSearch() {
    this.router.navigate(['/customer-search']);
  }

  showExitModal() {
    this.showExitPopup = true;
  }

  closeExitModal() {
    this.showExitPopup = false;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  isFormUpdated(): boolean {
    const savedForm = this.customerService.getFormData();
    
    //If there is no saved form, it has not been updated
    if (!savedForm) {
      return false;
    }

    const currentFormValue = this.customerForm.value;
  
    //We compare each field in the form one by one
    for (const key in currentFormValue) {
      if (currentFormValue.hasOwnProperty(key)) {
        if (currentFormValue[key] !== savedForm.value[key]) {
          return true;
        }
      }
    }
  
    return false;
  }
  
}
