import { routes } from './../../../app.routes';
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
  customerForm: FormGroup; // Reactive Form için FormGroup
  selectedOption: string = 'all'; // Varsayılan olarak tüm inputlar açık
  maxDate: string; // Maksimum seçilebilir tarih
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
    // Form validasyonu
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.showModal =true;
      return;
    }

    // Kaydedilmiş formu al
    const savedForm = this.customerService.getFormData();
    console.log(savedForm);
  
    // Eğer savedForm boşsa, yeni müşteri yaratılır
    if (!savedForm || Object.keys(savedForm).length === 0) {
      const customerCreateRequest: CustomerCreateRequest = this.customerForm.value;
      console.log("1");
      this.customerService.createCustomer(customerCreateRequest).subscribe({
        next: (response) => {
          this.customerService.customerId = response.id;
          this.customerService.setFormData(this.customerForm);
          console.log("2");
          // Başarılı olduğunda adres bilgisine yönlendir
          this.router.navigate(['/address-info']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    // Eğer savedForm boş değil ve formda güncelleme yoksa
    else if (savedForm && !this.isFormUpdated()) {
      // Formda değişiklik yoksa sadece adres bilgisi sayfasına yönlendir
      this.router.navigate(['/address-info']);
      console.log("3");
    }
    // Eğer savedForm dolu ve formda değişiklik varsa
    else if (savedForm && this.isFormUpdated()) {
      const customerUpdateRequest: CustomerCreateRequest = this.customerForm.value; // Formdaki güncel değerler update isteği olarak gönderilir
      const customerId = this.customerService.customerId; // Güncellenecek müşteri ID'si
      console.log("4");
      this.customerService.updateCustomer(customerUpdateRequest, customerId).subscribe({
        next: (response) => {
          // Güncelleme başarılı olduğunda adres bilgisine yönlendir
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
    
    // Eğer kaydedilen form yoksa, güncellenmemiştir
    if (!savedForm) {
      return false;
    }
  
    // customerForm içindeki mevcut değerleri alıyoruz
    const currentFormValue = this.customerForm.value;
  
    // Formdaki her alanı tek tek karşılaştırıyoruz
    for (const key in currentFormValue) {
      if (currentFormValue.hasOwnProperty(key)) {
        // Eğer herhangi bir değer farklıysa, form güncellenmiş demektir
        if (currentFormValue[key] !== savedForm.value[key]) {
          return true;
        }
      }
    }
  
    // Eğer tüm değerler aynıysa form güncellenmemiştir
    return false;
  }
  
}
