import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-analysis-skeleton-loader',
  templateUrl: './analysis-skeleton-loader.component.html',
  styleUrl: './analysis-skeleton-loader.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AnalysisSkeletonLoaderComponent {}
