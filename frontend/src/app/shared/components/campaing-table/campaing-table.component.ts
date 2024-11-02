import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaing-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campaing-table.component.html',
  styleUrl: './campaing-table.component.scss',
})
export class CampaingTableComponent implements OnInit {
  campaigns = [
    { id: 1, name: 'Ek Paketlerde %20 İndirim', endDate: '26.08.2026' },
    { id: 2, name: 'Tüm Faturalılara %10 İndirim', endDate: '16.10.2026' },
    {
      id: 3,
      name: 'EK 2GB Sosyal Medya Paketi - 10GB+2GB İnternet',
      endDate: '26.08.2026',
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
