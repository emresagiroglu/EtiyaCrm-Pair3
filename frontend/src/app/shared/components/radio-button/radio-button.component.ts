import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() options: Array<{ label: string; value: string }> = [];
  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>(); // Output adı güncellendi

  onOptionChange(value: string) {
    this.selectedOption = value;
    this.selectedOptionChange.emit(this.selectedOption); // selectedOptionChange olayını tetikle
  }
}
