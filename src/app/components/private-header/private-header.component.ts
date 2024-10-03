import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateHeaderComponent {}
