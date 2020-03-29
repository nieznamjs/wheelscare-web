import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public open<T>(component: ComponentType<T>, options: MatDialogConfig): MatDialogRef<T> {
    return this.dialog.open(component, { ...options });
  }
}
