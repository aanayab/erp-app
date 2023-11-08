import { NgModule } from '@angular/core';

import {  MatCardModule} from '@angular/material/card';
import {  MatInputModule} from '@angular/material/input';
import {  MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';






const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
