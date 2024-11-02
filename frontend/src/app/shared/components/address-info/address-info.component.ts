import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [
    PopupComponent,
    ButtonComponent,
    RadioButtonComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent {
  showModal: boolean = false;
  showExitPopup: boolean = false;
  addresses: any[] = []; // Adresleri saklamak için dizi
  newAddress = {
    neighborhood: '',
    street: '',
    houseFlat: '',
    district: '',
    city: '',
    description: '',
  }; // Yeni adres form verisi

  handleButtonClick() {
    this.showExitPopup = true;
  }

  openModal() {
    this.showModal = true;
 
  }

  closeModal() {
    this.showModal = false;
    this.showExitPopup = false;
  }

  saveAddress() {
    // Form verisini adres listesine ekle
    this.addresses.push({ ...this.newAddress });

    // Formdaki verileri sıfırla
    this.newAddress = {
      neighborhood: '',
      street: '',
      houseFlat: '',
      district: '',
      city: '',
      description: '',
    };

    // Popup'ı kapat
    this.closeModal();
  }

  selectedOption: string = 'all';

  options = [{ label: 'Primary Address', value: 'all' }];

  onSubmit(form: NgForm) {
    // Tüm alanlar doluysa ve form geçerliyse adresi kaydet
    if (form.valid) {
      this.saveAddress();
    }
  }
}
