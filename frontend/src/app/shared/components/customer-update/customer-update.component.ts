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
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss'], // styleUrl düzeltildi
})
export class CustomerUpdateComponent {
  customerUpdateForm: FormGroup;
  selectedGender: string = ''; 
  selectedOption: string = 'all';

  constructor(private fb: FormBuilder) {
    this.customerUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  handleButtonClick() {
    if (this.customerUpdateForm.invalid) {
      this.customerUpdateForm.markAllAsTouched(); 
      alert('Please fill out all required fields correctly.');
      return;
    }
    console.log('Form Submitted:', this.customerUpdateForm.value);
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleExit() {
    console.log('Exiting...');
  }

  handlePrevious() {
    // Önceki adıma gitme işlemi
    console.log('Going to previous step...');
  }

  handleSave() {
    this.handleButtonClick(); // Formu kaydetme işlemi
  }
}