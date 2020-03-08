import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public open(component: ComponentType<any>): MatDialogRef<ComponentType<any>> {
    return this.dialog.open(component, {
      disableClose: true,
    });
  }
}
