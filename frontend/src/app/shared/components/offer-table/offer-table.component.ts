import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-offer-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offer-table.component.html',
  styleUrl: './offer-table.component.scss',
})
export class OfferTableComponent {
  offers = [
    { id: 1, productId: 37, name: 'Gençlere Özel', discount: '20' },
    { id: 2, productId: 16, name: '1. Yıla Özel', discount: '30' },
    {
      id: 3,
      productId: 8,
      name: 'Yeni Abonelere Özel',
      discount: '25',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // API çağrısını buraya eklenecek
    // Örneğin: this.fetchProductsFromApi();
  }

  // Backend'den veri çekme yöntemi (örnek)
  fetchProductsFromApi() {
    // API isteğini burada olacak
    // Örneğin: this.http.get<Product[]>(endpoint).subscribe(data => this.products = data);
  }
}
