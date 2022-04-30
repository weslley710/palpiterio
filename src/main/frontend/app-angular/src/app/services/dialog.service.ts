import { Injectable } from '@angular/core';

import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  
  openConfirmDialog(msg: string) {
	return this.dialog.open(ConfirmDialogComponent, {
		width: '390px',
		panelClass: 'confirm-dialog-container',
		disableClose: true,
		data: {
			message: msg
		}
	})
  }
}
