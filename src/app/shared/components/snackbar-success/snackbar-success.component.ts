import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackbarData } from '@interfaces';

@Component({
  selector: 'wcw-snackbar-success',
  templateUrl: './snackbar-success.component.html',
  styleUrls: ['./snackbar-success.component.scss']
})
export class SnackbarSuccessComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackbarRef: MatSnackBarRef<SnackbarSuccessComponent>,
  ) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
