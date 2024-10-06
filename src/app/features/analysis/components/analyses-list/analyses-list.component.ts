import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-analyses-list',
  templateUrl: './analyses-list.component.html',
  styleUrl: './analyses-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AnalysesListComponent {}
