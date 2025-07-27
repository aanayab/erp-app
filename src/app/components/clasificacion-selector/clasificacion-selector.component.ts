
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clasificacion-selector',
  templateUrl: './clasificacion-selector.component.html',
  styleUrls: ['./clasificacion-selector.component.css']
})
export class ClasificacionSelectorComponent {
  @Input() selectedItem: string | null | undefined = null;
  @Output() selectedItemChange = new EventEmitter<string>();

  searchTerm = '';
  items: string[] = ['Cliente', 'Proveedor', 'Distribuidor', 'Socio Estratégico', 'Competidor', 'Empresa Interna', 'Prospecto', 'Aliado Comercial'];

  filteredItems(): string[] {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(term));
  }

  onChange(item: string): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }
}
