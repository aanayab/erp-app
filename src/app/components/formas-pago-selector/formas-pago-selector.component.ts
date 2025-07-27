
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formas-pago-selector',
  templateUrl: './formas-pago-selector.component.html',
  styleUrls: ['./formas-pago-selector.component.css']
})
export class FormasPagoSelectorComponent {
@Input() selectedItem: string | null | undefined = null;
  @Output() selectedItemChange = new EventEmitter<string>();

  searchTerm = '';
  // 'Cheque', 'PayPal', 'Criptomoneda',
  items: string[] = ['IBAN', 'Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'CLABE'];

  filteredItems(): string[] {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(term));
  }

  onChange(item: string): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }
}
