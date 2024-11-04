import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/Customer';
import { CommonModule } from '@angular/common';
import { CustomerSearchService } from '../../services/customer-service/customer-search.service';
import { CustomerListResponse } from '../../models/customer/customerListResponse';
import { CustomerSearchResponse } from '../../models/customer/customerSearchResponse';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent implements OnInit {

  customers!: CustomerListResponse[];
  @Input() searchResulDatas!: CustomerSearchResponse[];

  constructor(
    private customerService: CustomerSearchService, 
    private change: ChangeDetectorRef,
    private router: Router // Router servisini ekleyin
  ) {}

  ngOnInit(): void {
   
  }

  customerIdOnClick(customerId: string) {
    // 'customer-info' bileşenine yönlendirme
    this.router.navigate(['/customer-info', customerId]);
  }


}
