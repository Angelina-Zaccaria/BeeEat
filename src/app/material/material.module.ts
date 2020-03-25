import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule
  ]
})
export class MaterialModule { }
