import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabv2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabv2.component.html',
  styleUrl: './tabv2.component.scss',
})
export class Tabv2Component {
  @Input() tabs: string[] = []; // Sekme isimlerini alır
  @Input() activeTab: number = 0; // Varsayılan aktif sekme
  @Input() tabWidth: string = 'auto'; // Sekme genişliği

  selectTab(index: number) {
    this.activeTab = index;
  }
}
