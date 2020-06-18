import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackbarData } from '@interfaces';

@Component({
  selector: 'wcw-snackbar-error',
  templateUrl: './snackbar-error.component.html',
  styleUrls: ['./snackbar-error.component.scss']
})
export class SnackbarErrorComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackbarRef: MatSnackBarRef<SnackbarErrorComponent>,
  ) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
