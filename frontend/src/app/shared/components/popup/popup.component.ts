import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Input() modalWidth: string = '500px'; // Modal genişliği
  @Input() modalHeight: string = '343px'; // Modal yüksekliği
  @Input() icon?: any; // Üstteki icon
  @Input() title: string = ''; // Title alanı
  @Input() content?: any = ''; // İçerik alanı
  @Output() onClose = new EventEmitter<void>(); // Kapatma eventi

  closePopup() {
    this.onClose.emit();
  }
}
