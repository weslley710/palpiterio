import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class PaymentDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PaymentDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
	this.dialogRef.close(false);
  }
}
