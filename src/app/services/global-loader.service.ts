import { Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  isLoading = signal<boolean>(false);
  isRedirecting = signal<boolean>(false);
  loaderText = signal<string>('Redirecting');

  showUntilCompleted$<T>(obs$: Observable<T>): Observable<T> {
    this.isLoading.set(true);

    return obs$.pipe(finalize(() => this.isLoading.set(false)));
  }

  showUntilRedirected$<T>(obs$: Observable<T>, loaderText = 'Redirecting'): Observable<T> {
    this.isRedirecting.set(true);
    this.loaderText.set(loaderText);

    return obs$.pipe(finalize(() => this.isRedirecting.set(false)));
  }
}
