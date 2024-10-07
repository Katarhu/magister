import { Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  isLoading = signal<boolean>(false);

  showUntilCompleted$<T>(obs$: Observable<T>): Observable<T> {
    this.isLoading.set(true);

    return obs$.pipe(finalize(() => this.isLoading.set(false)));
  }
}
