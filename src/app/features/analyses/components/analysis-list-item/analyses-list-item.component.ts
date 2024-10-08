import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IAnalysis } from '@features/analyses/analyses.models';
import { MatCard } from '@angular/material/card';
import { AnalysesListItemFunctions } from '@features/analyses/components/analysis-list-item/analyses-list-item.functions';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-analyses-list-item',
  templateUrl: './analyses-list-item.component.html',
  styleUrl: './analyses-list-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, RouterLink, MatIcon, MatButton],
})
export class AnalysesListItemComponent {
  analysis = input.required<IAnalysis>();
  displayDate = computed(() => AnalysesListItemFunctions.formatAnalysisDate(this.analysis().created_at));
}
