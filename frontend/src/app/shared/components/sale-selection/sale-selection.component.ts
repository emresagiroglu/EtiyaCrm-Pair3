import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ButtonComponent } from '../button/button.component';
import { CampaingTableComponent } from '../campaing-table/campaing-table.component';
import { OfferTableComponent } from '../offer-table/offer-table.component';

@Component({
  selector: 'app-sale-selection',
  standalone: true,
  imports: [
    TabsComponent,
    CommonModule,
    ProductTableComponent,
    ButtonComponent,
    CampaingTableComponent,
    OfferTableComponent,
  ],
  templateUrl: './sale-selection.component.html',
  styleUrl: './sale-selection.component.scss',
})
export class SaleSelectionComponent {
  tabs: string[] = ['Catalog', 'Campaing', 'Offer'];

  activeTab: number = 0;

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  searchClick() {
    console.log('Search işlemi başladı');
  }

  addToCart() {
    console.log('Carta eklendi');
  }

  clearCart() {
    console.log('cart bilgileri silindi');
  }
}
