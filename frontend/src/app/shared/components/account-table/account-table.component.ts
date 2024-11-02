import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.scss',
})
export class AccountTableComponent {
  // Example static fields for the account status table
  accountFields = [
    'Account Status',
    'Account Number',
    'Account Name',
    'Account Type',
  ];

  // Example data for dynamic account information
  accountData = {
    status: 'Active',
    number: '11100074459',
    name: 'Account_1',
    type: 'Billing Account',
  };

  // Example static fields for the product table
  productFields = [
    'Product ID',
    'Product Name',
    'Campaign Name',
    'Campaign ID',
  ];

  // Example data for dynamic product information
  products = [
    {
      id: '001',
      name: 'ADBL BMB',
      campaignName: 'Campaign 1',
      campaignId: 'C001',
    },
    {
      id: '002',
      name: 'ADBL Data Modem',
      campaignName: '',
      campaignId: '',
    },
    {
      id: '003',
      name: 'New Product',
      campaignName: '',
      campaignId: '',
    },
  ];
}
