import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IAnalysis } from '@features/analyses/analyses.models';
import { formatAnalysisDate } from '@app/tools/utils/format-date';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AnalysisComponent {
  analysis = input.required<IAnalysis>();
  formattedDate = computed(() => formatAnalysisDate(this.analysis().created_at));
}
