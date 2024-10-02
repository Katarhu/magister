import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  snackbar = inject(MatSnackBar);

  open(message: string, action = 'Confirm', duration?: number): Observable<void> {
    return this.snackbar.open(message, action, { duration }).afterOpened();
  }
}
