import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalysesStore } from '@features/analyses/store/analyses.store';
import { AnalysesListItemComponent } from '@features/analyses/components/analysis-list-item/analyses-list-item.component';

@Component({
  selector: 'app-analyses-list',
  templateUrl: './analyses-list.component.html',
  styleUrl: './analyses-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AnalysesListItemComponent],
})
export class AnalysesListComponent {
  private readonly analysesStore = inject(AnalysesStore);

  predictedAnalyses = this.analysesStore.entities;
}
