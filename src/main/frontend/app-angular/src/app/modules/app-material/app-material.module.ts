import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatCardModule,
	MatButtonModule,
	MatIconModule,
	MatSnackBarModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatToolbarModule,
	MatTableModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatFormFieldModule,
	MatDialogModule,
	MatSelectModule,
	MatStepperModule,
	MatAutocompleteModule,
	MatTabsModule
  ],
  exports: [
    MatCardModule,
	MatButtonModule,
	MatIconModule,
	MatSnackBarModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatToolbarModule,
	MatTableModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatFormFieldModule,
	MatDialogModule,
	MatSelectModule,
	MatStepperModule,
	MatAutocompleteModule,
	MatTabsModule
  ]
})

export class AppMaterialModule { }
