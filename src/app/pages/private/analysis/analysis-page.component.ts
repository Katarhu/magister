import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { AnalysesStore } from '@features/analyses/store/analyses.store';
import { IAnalysis } from '@features/analyses/analyses.models';
import { EntityMap } from '@ngrx/signals/entities';
import { AnalysisComponent } from '@features/analyses/components/analysis/analysis.component';
import { AnalysisSkeletonLoaderComponent } from '@features/analyses/components/analysis-skeleton-loader/analysis-skeleton-loader.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnalysisComponent, AnalysisSkeletonLoaderComponent, MatButton, RouterLink],
})
export default class AnalysisPageComponent {
  private readonly analysesStore = inject(AnalysesStore);

  @Input()
  id!: string;

  isAnalysesLoading = this.analysesStore.loading;
  predictedAnalysesMap = this.analysesStore.entityMap;
  analysis = computed(() => this.getAnalysisEntityMap(this.predictedAnalysesMap()));

  private getAnalysisEntityMap(map: EntityMap<IAnalysis>): IAnalysis | null {
    const analysis = map[this.id];

    if (!analysis) return null;

    return analysis;
  }
}
