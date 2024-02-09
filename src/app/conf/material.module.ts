import { NgModule } from '@angular/core';

import {  MatCardModule} from '@angular/material/card';
import {  MatInputModule} from '@angular/material/input';
import {  MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';



const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTreeModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
