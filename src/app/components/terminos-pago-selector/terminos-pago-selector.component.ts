
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terminos-pago-selector',
  templateUrl: './terminos-pago-selector.component.html',
  styleUrls: ['./terminos-pago-selector.component.css']
})
export class TerminosPagoSelectorComponent {
  @Input() selectedItem: string | null | undefined = null;
  @Output() selectedItemChange = new EventEmitter<string>();

  searchTerm = '';
  items: string[] = ['Contado', '7 días', '15 días', '30 días', '60 días', '90 días'];

  filteredItems(): string[] {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(term));
  }

  onChange(item: string): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }
}
