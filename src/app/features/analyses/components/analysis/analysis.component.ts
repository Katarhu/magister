import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IExtendedAnalysis } from '@features/analyses/analyses.models';
import { formatAnalysisDate } from '@app/tools/utils/format-date';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem, MatListItemLine } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeyValuePipe,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    TitleCasePipe,
    MatDivider,
    MatList,
    MatListItem,
    MatIcon,
    MatListItemLine,
  ],
})
export class AnalysisComponent {
  analysis = input.required<IExtendedAnalysis>();
  formattedDate = computed(() => formatAnalysisDate(new Date(this.analysis().created_at)));

  isDescriptionArray(value: string | string[]) {
    return Array.isArray(value);
  }
}
