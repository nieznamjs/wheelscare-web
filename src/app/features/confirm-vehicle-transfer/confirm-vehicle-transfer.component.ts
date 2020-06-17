import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants';

@Component({
  selector: 'wcw-confirm-vehicle-transfer',
  templateUrl: './confirm-vehicle-transfer.component.html',
  styleUrls: ['./confirm-vehicle-transfer.component.scss']
})
export class ConfirmVehicleTransferComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public errors: string[];
  public token: string;

  private destroy$ = new ReplaySubject<void>(1);

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(({ token }) => {
      if (!token) {
        this.snackbarService.showError(SnackbarMessages.VehicleTransferIncorrectUrl, { duration: 5000 });
      }

      this.token = token;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public confirmTransfer(): void {
    if (!this.token) { return; }

    this.vehiclesDataService.confirmVehicleTransfer(this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.loading = response.loading;
        this.errors = response.errors;

        if (response.data) {
          this.snackbarService.showSuccess(SnackbarMessages.VehicleTransferedSuccessfully);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
