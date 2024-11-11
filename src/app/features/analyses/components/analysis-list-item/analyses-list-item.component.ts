import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IAnalysis } from '@features/analyses/analyses.models';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { formatAnalysisDate } from '@app/tools/utils/format-date';

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
  displayDate = computed(() => formatAnalysisDate(new Date(this.analysis().created_at)));
}
