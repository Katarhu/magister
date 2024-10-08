import { Component, inject } from '@angular/core';
import { GlobalLoaderService } from '@services/global-loader.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
  standalone: true,
  imports: [MatProgressSpinner],
})
export class GlobalLoaderComponent {
  private readonly loaderService = inject(GlobalLoaderService);

  get isLoading() {
    return this.loaderService.isLoading;
  }

  get isRedirecting() {
    return this.loaderService.isRedirecting;
  }

  get redirectingText() {
    return this.loaderService.loaderText;
  }
}
