
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-regimen-fiscal-selector',
  templateUrl: './regimen-fiscal-selector.component.html',
  styleUrls: ['./regimen-fiscal-selector.component.css']
})
export class RegimenFiscalSelectorComponent {
  @Input() selectedItem: string | null | undefined = null;
  @Output() selectedItemChange = new EventEmitter<string>();

  searchTerm = '';
  items: string[] = ['Régimen General de Ley Personas Morales', 'Personas Físicas con Actividades Empresariales y Profesionales', 'Régimen Simplificado de Confianza', 'Régimen de Incorporación Fiscal', 'Sueldos y Salarios e Ingresos Asimilados', 'Régimen de Arrendamiento'];

  filteredItems(): string[] {
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item => item.toLowerCase().includes(term));
  }

  onChange(item: string): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(item);
  }
}
