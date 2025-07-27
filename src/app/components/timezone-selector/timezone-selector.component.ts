

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ct from 'countries-and-timezones';





@Component({
  selector: 'app-timezone-selector',
  templateUrl: './timezone-selector.component.html',
  styleUrls: ['./timezone-selector.component.css']
})


// TODO quit oncahcnges
export class TimezoneSelectorComponent {
  @Input() timezones: string[] = []; // <- Recibido desde el componente padre
  @Input() selectedTimezone: string | undefined| null = null;
    @Output() selectedItemChange = new EventEmitter<string>();
   searchTerm = '';

  ngOnInit() {
    // this.loadTimezones();
  }

  // loadTimezones() {
  //   const allTimezones = ct.getAllTimezones();
  //   this.timezones = Object.keys(allTimezones).sort(); // Orden alfabético
  // }

  onTimezoneChange(value: string) {
  
    this.selectedTimezone = value;
     this.selectedItemChange.emit(value);
    console.log('Zona horaria seleccionada:', this.selectedTimezone);
  }

filteredItems(): string[] {
  if(this.timezones == undefined)
  {
    return [];
  }
  const term = this.searchTerm.toLowerCase();
  return this.timezones.filter(item =>
    item.toLowerCase().includes(term)
  );
}

}


