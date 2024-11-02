import { Component } from '@angular/core';
import { AccountTableComponent } from '../account-table/account-table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [
    AccountTableComponent,
    CommonModule,
    ButtonComponent,
    PopupComponent,
    FormsModule,
  ],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
})
export class CustomerAccountComponent {
  handleClick() {}

  showModal: boolean = false;
  showSuccessModal: boolean = false;
  showAddressModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openSuccessModal() {
    this.showSuccessModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  openAddressModal() {
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
  }
}
