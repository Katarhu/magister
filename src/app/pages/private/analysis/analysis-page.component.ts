import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { IExtendedAnalysis } from '@features/analyses/analyses.models';
import { AnalysisComponent } from '@features/analyses/components/analysis/analysis.component';
import { AnalysisSkeletonLoaderComponent } from '@features/analyses/components/analysis-skeleton-loader/analysis-skeleton-loader.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AnalysesHttpService } from '@features/analyses/services/analyses-http.service';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnalysisComponent, AnalysisSkeletonLoaderComponent, MatButton, RouterLink],
})
export default class AnalysisPageComponent implements OnInit {
  private readonly analysesHttpService = inject(AnalysesHttpService);

  @Input()
  id!: string;

  analysis = signal<IExtendedAnalysis | null>(null);
  isAnalysisLoading = signal<boolean>(true);

  ngOnInit() {
    this.analysesHttpService
      .fetchPredictedAnalysis$(this.id)
      .pipe(
        take(1),
        tap(() => this.isAnalysisLoading.set(true)),
        finalize(() => this.isAnalysisLoading.set(false)),
      )
      .subscribe({
        next: analysis => {
          this.analysis.set(analysis);
        },
      });
  }
}
