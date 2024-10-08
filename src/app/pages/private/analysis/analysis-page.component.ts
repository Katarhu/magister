import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export default class AnalysisPageComponent {}
