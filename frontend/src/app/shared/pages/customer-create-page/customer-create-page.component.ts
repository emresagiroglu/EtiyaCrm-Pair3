import { Component } from '@angular/core';
import { CustomerCreateComponent } from '../../components/customer-create/customer-create.component';
import { CustomerInfoComponent } from "../../components/customer-info/customer-info.component";
import { AddressInfoComponent } from '../../components/address-info/address-info.component';

@Component({
  selector: 'app-customer-create-page',
  standalone: true,
  imports: [CustomerCreateComponent, AddressInfoComponent],
  templateUrl: './customer-create-page.component.html',
  styleUrl: './customer-create-page.component.scss'
})
export class CustomerCreatePageComponent {

}
