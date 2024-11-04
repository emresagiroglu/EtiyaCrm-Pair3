import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerCncinfoService } from '../../services/customer-service/customer-cncinfo.service';
import { CustomerCncInfoResponse } from '../../models/customer/customerCncInfoResponse';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, PopupComponent, ButtonComponent],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  showModal: boolean = false;
  customer: CustomerCncInfoResponse = {} as CustomerCncInfoResponse;

  constructor(
    private router: Router,
    private customerCncInfoService: CustomerCncinfoService,
    private route: ActivatedRoute // ActivatedRoute servisini ekleyin
  ) {}

  ngOnInit(): void {
    // URL'den 'id' parametresini alıyoruz
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.getCustomer(Number(customerId)); // API isteğini yapıyoruz
    }
  }

  getCustomer(id: number) {
    this.customerCncInfoService
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
