import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackbarSuccessComponent } from '@components/snackbar-success/snackbar-success.component';
import { SnackbarErrorComponent } from '@components/snackbar-error/snackbar-error.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  public showSuccess(message: string, options?: MatSnackBarConfig): MatSnackBarRef<SnackbarSuccessComponent> {
    return this.snackbar.openFromComponent(SnackbarSuccessComponent, {
      data: { message },
      ...options,
    });
  }

  public showError(message: string, options?: MatSnackBarConfig): MatSnackBarRef<SnackbarErrorComponent> {
    return this.snackbar.openFromComponent(SnackbarErrorComponent, {
      data: { message },
      ...options,
    });
  }
}
