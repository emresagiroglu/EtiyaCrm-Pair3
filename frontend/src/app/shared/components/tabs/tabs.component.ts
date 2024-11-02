import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: string[] = []; // Sekme isimlerini alır
  @Input() activeTab: number = 0; // Varsayılan aktif sekme
  @Input() tabWidth: string = 'auto'; // Sekme genişliği

  selectTab(index: number) {
    this.activeTab = index;
  }
}
