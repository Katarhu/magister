import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalysisStore } from '@features/analysis/store/analysis.store';
import { AnalysisComponent } from '@features/analysis/components/analysis/analysis.component';

@Component({
  selector: 'app-analyses-list',
  templateUrl: './analyses-list.component.html',
  styleUrl: './analyses-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AnalysisComponent],
})
export class AnalysesListComponent {
  private readonly analysesStore = inject(AnalysisStore);

  predictedAnalyses = this.analysesStore.entities;
}
