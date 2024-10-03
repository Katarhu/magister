import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  isLoading = false;

  showUntilCompleted$<T>(obs$: Observable<T>) {
    this.isLoading = true;

    return obs$.pipe(finalize(() => (this.isLoading = false)));
  }
}
