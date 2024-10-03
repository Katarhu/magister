import { Component, inject } from '@angular/core';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
})
export class GlobalLoaderComponent {
  private readonly loaderService = inject(GlobalLoaderService);

  get isLoading() {
    return this.loaderService.isLoading;
  }
}
