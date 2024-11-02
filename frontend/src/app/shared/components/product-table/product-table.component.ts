import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent implements OnInit {
  products = [
    { id: 1, name: 'EK 2GB Sosyal Medya Paketi - 10GB+2GB İnternet' },
    { id: 2, name: 'EK 2GB Sosyal Medya Paketi - 15GB+2GB İnternet' },
    { id: 3, name: 'EK 2GB Sosyal Medya Paketi - 20GB+2GB İnternet' },
    { id: 4, name: 'Uğurlu 1GB Tarifesi - 1GB İnternet' },
    { id: 5, name: 'Uğurlu 3GB Tarifesi - 5GB İnternet' },
    { id: 6, name: 'Uğurlu 3GB Tarifesi - 10GB İnternet' },
    { id: 7, name: 'Prime Düşün 30GB Tarifesi - 25GB + 5GB İnternet' },
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
