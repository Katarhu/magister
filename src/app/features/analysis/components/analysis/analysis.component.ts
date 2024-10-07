import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IAnalysis } from '@features/analysis/analysis.models';
import { MatCard } from '@angular/material/card';
import { AnalysisFunctions } from '@features/analysis/components/analysis/analysis.functions';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, RouterLink, MatIcon, MatButton],
})
export class AnalysisComponent {
  analysis = input.required<IAnalysis>();
  displayDate = computed(() => AnalysisFunctions.formatAnalysisDate(this.analysis().created_at));
}
