import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { CncInfoCreateResponse } from '../../models/cnc-info/cncInfoCreateResponse';
import { ContactInfoService } from '../../services/customer-service/contact-info.service';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerGetByIdResponse } from '../../models/customer/customerGetByIdResponse';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, PopupComponent, ButtonComponent],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  showModal: boolean = false;
  customer: CustomerGetByIdResponse = {} as CustomerGetByIdResponse;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // URL'den 'id' parametresini alıyoruz
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.getCustomer(Number(customerId)); // API isteğini yapıyoruz
    }
  }

  getCustomer(id: number) {
    this.customerService
      .getCustomerById({ id })
      .subscribe((response) => {
        this.customer = response;
      });
  }

  handleClick() {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goToCustomerCreate() {
    this.router.navigate(['/customer-create']);
  }
}
