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

  constructor(private fb: FormBuilder) {
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
    console.log('Form Submitted:', this.customerForm.value);
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
