import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule,
  MatStepperModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule

} from '@angular/material/';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
