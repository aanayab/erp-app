import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tipo-integracion-selector',
  templateUrl: './tipo-integracion-selector.component.html',
  styleUrls: ['./tipo-integracion-selector.component.css']
})

export class TipoIntegracionSelectorComponent {
 @Input() selectedItem: string | null | undefined = null;
  @Output() selectedItemChange = new EventEmitter<string>();

  searchTerm = '';
  items: string[] = ['Ninguna', 'Manual', 'API REST', 'EDI (Intercambio Electrónico de Datos)', 'FTP / SFTP', 'Webhook', 'Middleware (MuleSoft, SAP PI/PO)'];

  filteredItems(): string[] {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(term));
  }

  onChange(item: string): void {
     
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }
}

