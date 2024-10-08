import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-analyses-list-loader',
  templateUrl: './analyses-list-loader.component.html',
  styleUrl: './analyses-list-loader.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatCard, MatIcon],
})
export class AnalysesListLoaderComponent {
  readonly LOADER_ELEMENTS = Array(3).fill(null);
}
