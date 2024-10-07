import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAnalysis } from '@features/analysis/analysis.models';

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
}
