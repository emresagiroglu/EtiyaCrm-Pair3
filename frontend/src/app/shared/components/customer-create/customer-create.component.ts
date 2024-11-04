import { CustomerIdService } from './../../services/customer-service/customer-id.service';
import { CustomerCreateService } from './../../../shared/services/customer-service/customer-create.service';
import { routes } from './../../../app.routes';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
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
export class CustomerCreateComponent {
  customerForm: FormGroup; // Reactive Form için FormGroup
  selectedOption: string = 'all'; // Varsayılan olarak tüm inputlar açık
  maxDate: string; // Maksimum seçilebilir tarih

  constructor(private fb: FormBuilder, private router: Router,
     private customerCreateService : CustomerCreateService, private customerIdService : CustomerIdService) {
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
      nationality:[true],
      nationalityId: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  options = [
    { label: 'Turkish', value: 'all' },
    { label: 'Other', value: 'hide' },
  ];

  handleButtonClick() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
      return;
    }
    const customerCreateRequest: CustomerCreateRequest = this.customerForm.value;
  
    this.customerCreateService.createCustomer(customerCreateRequest).subscribe({
      next: (response) => {
        this.customerIdService.customerId = response.id;
        this.router.navigate(['/address-info']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
