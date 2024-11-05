import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>(); // Bu EventEmitter number türünde olmalı

  selectPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.currentPageChange.emit(this.currentPage); // İki yönlü bağlama için currentPageChange olayını yayınlıyoruz
      this.pageChange.emit(this.currentPage); // pageChange olayını number türünde emit ediyoruz
    }
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
