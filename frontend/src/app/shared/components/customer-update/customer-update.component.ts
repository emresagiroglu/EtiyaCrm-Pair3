
import { CustomerCncRequest } from './../../models/customer/customerCncRequest';
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
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerUpdateService } from '../../services/customer-update.service';
import { CustomerUpdateRequest } from '../../models/customer/customerUpdateRequest';
import { CustomerUpdateResponse } from '../../models/customer/customerUpdateResponse';
import { CustomerIdService } from '../../services/customer-service/customer-id.service';
import { CustomerCncService } from '../../services/customer-service/customer-cnc.service';


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
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss'], 
})

export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup;
  selectedGender: string = ''; 
  selectedOption: string = 'all';
  currentCustomerId! : number;
  customerId: number | null = null;  // Müşteri kimliğini tutmak için bir değişken
  customer: CustomerUpdateResponse | null = null;  // Güncellenmiş müşteri bilgileri
        
        
  constructor(private fb: FormBuilder, private customerIdService : CustomerIdService, 
    private customerCncService : CustomerCncService, private router : Router,private customerUpdateService : CustomerUpdateService,private route: ActivatedRoute) {
    this.customerUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fax: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
     
    });
    
  }

  ngOnInit() {
    this.currentCustomerId = this.customerIdService.customerId;
  }
 
  handleButtonClick() {
    if (this.customerUpdateForm.invalid) {
      this.customerUpdateForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
      return;
    }

    console.log('Form Submitted:', this.customerUpdateForm.value);

    const customerUpdateRequest: CustomerUpdateRequest = {
      id: this.customerId!,
      email: this.customerUpdateForm.value.email,
      phone: this.customerUpdateForm.value.phone,
      fax: this.customerUpdateForm.value.fax,
      homePhone: this.customerUpdateForm.value.homePhone,
    };


    const customerCncRequest: CustomerCncRequest = {
      customerId : this.currentCustomerId,
      contactName : "",
      email: this.customerUpdateForm.get('email')?.value,
      homePhone: this.customerUpdateForm.get('homePhone')?.value,
      mobilePhone: this.customerUpdateForm.get('phone')?.value,
      fax: this.customerUpdateForm.get('fax')?.value,
    }
    this.customerCncService.createCncInfo(customerCncRequest).subscribe({
      next: (response) => {
        if(response.customerId != null) {
          this.router.navigate(['/customer-search']);
        }
      }
    })

  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleExit() {
    console.log('Exiting...');
  }

  handlePrevious() {
    console.log('Going to previous step...');
  }

  handleSave() {
    this.handleButtonClick(); 
  }

  goToSearch() {
    this.router.navigate(['/customer-search']);
  }
}