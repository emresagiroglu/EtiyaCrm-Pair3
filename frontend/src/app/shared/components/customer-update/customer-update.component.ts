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
import { ContactInfoService } from '../../services/customer-service/contact-info.service';

import { CustomerService } from '../../services/customer-service/customer.service';
import { CncInfoCreateRequest } from '../../models/cnc-info/cncInfoCreateRequest';
import { CncInfoUpdateRequest } from '../../models/cnc-info/cncInfoUpdateRequest';


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
 // customer: CustomerU | null = null;  // Güncellenmiş müşteri bilgileri
 showExitPopup: boolean = false;
        
  showModal: boolean = false;
        
  constructor(private fb: FormBuilder, private customerService : CustomerService, 
    private cncInfoService : ContactInfoService, private router : Router,private route: ActivatedRoute) {
    this.customerUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fax: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
     
    });
    
  }
  showExitModal() {
    this.showExitPopup = true;
  }

  closeExitModal() {
    this.showExitPopup = false;
  }

  ngOnInit() {
    this.currentCustomerId = this.customerService.customerId;
  }

 
  handleButtonClick() {
    if (this.customerUpdateForm.invalid) {
      this.customerUpdateForm.markAllAsTouched();
      this.showModal =true;
      return;
    }
 
    
    console.log('Form Submitted:', this.customerUpdateForm.value);

    const cncInfoUpdateRequest: CncInfoUpdateRequest = {
      id: this.customerId!,
      email: this.customerUpdateForm.value.email,
      phone: this.customerUpdateForm.value.phone,
      fax: this.customerUpdateForm.value.fax,
      homePhone: this.customerUpdateForm.value.homePhone,
    };


    const cncInfoCreateRequest: CncInfoCreateRequest = {
      customerId : this.currentCustomerId,
      email: this.customerUpdateForm.get('email')?.value,
      homePhone: this.customerUpdateForm.get('homePhone')?.value,
      mobilePhone: this.customerUpdateForm.get('phone')?.value,
      fax: this.customerUpdateForm.get('fax')?.value,
    }
    this.cncInfoService.createCncInfo(cncInfoCreateRequest).subscribe({
      next: (response) => {
        if(response.customerId != null) {
          this.router.navigate(['/customer-search']);
        }
      }
    })

  }

  closeModal() {
    this.showModal = false;
  }
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