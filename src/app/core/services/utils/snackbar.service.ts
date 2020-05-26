import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackbarSuccessComponent } from '@components/snackbar-success/snackbar-success.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  public showSuccess(message: string): MatSnackBarRef<SnackbarSuccessComponent> {
    return this.snackbar.openFromComponent(SnackbarSuccessComponent, {
      data: { message },
    });
  }
}
