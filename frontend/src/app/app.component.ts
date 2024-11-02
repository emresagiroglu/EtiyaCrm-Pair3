import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { initFlowbite } from 'flowbite';
import { LoginComponent } from './shared/components/login/login.component';
import { CustomerSearchComponent } from './shared/components/customer-search/customer-search.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { PopupComponent } from './shared/components/popup/popup.component';
import { CustomerCreateComponent } from './shared/components/customer-create/customer-create.component';
import { AddressInfoComponent } from './shared/components/address-info/address-info.component';
import { CustomerAccountComponent } from './shared/components/customer-account/customer-account.component';
import { AccountTableComponent } from './shared/components/account-table/account-table.component';
import { SaleSelectionComponent } from './shared/components/sale-selection/sale-selection.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    LoginComponent,
    CustomerSearchComponent,
    TabsComponent,
    PopupComponent,
    CustomerCreateComponent,
    AddressInfoComponent,
    CustomerAccountComponent,
    AccountTableComponent,
    SaleSelectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'etiyafrontend';
  isLoginPage: boolean = false; // Login sayfasını kontrol etmek için değişken

  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();

    // Router'ı dinleyerek sayfanın adını kontrol edin
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login'; // URL'ye göre kontrol et
      }
    });
  }
}