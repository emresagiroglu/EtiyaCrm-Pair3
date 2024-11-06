import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';
import { ContactInfoService } from '../../services/customer-service/contact-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CncInfoCreateRequest } from '../../models/cnc-info/cncInfoCreateRequest';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonComponent,
    ButtonComponent,
    PopupComponent
  ],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss'
})
export class ContactMediumComponent implements OnInit{
  
  contactCreateForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private customerService : CustomerService, 
    private cncInfoService : ContactInfoService, private router : Router,private route: ActivatedRoute) {
    this.contactCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      fax: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
     
    });
  }
  ngOnInit(): void {
    this.customerService.customerId;
  }

  handleButtonClick() {
    if (this.contactCreateForm.invalid) {
      this.contactCreateForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
      return;
    }

    console.log('Form Submitted:', this.contactCreateForm.value);

    const cncInfoCreateRequest: CncInfoCreateRequest = {
      customerId : this.customerService.customerId,
      email: this.contactCreateForm.get('email')?.value,
      homePhone: this.contactCreateForm.get('homePhone')?.value,
      mobilePhone: this.contactCreateForm.get('phone')?.value,
      fax: this.contactCreateForm.get('fax')?.value,
    }

    console.log("cncInfoCreateRequest",cncInfoCreateRequest)

    this.cncInfoService.createCncInfo(cncInfoCreateRequest).subscribe({
      next: (response) => {
        if(response.customerId != null) {
          console.log(response)
          this.router.navigate(['/customer-search']);
        }
      }
    })

  }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleExit() {
    console.log('Exiting...');
  }

  handlePrevious() {
    this.router.navigate([`/address-info`])
  }

  handleSave() {
    this.handleButtonClick(); 
  }

  goToSearch() {
    this.router.navigate(['/customer-search']);
  }
    
}
