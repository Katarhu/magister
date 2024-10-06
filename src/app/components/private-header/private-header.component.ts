import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatMenu, MatIcon, MatMenuTrigger, MatMiniFabButton, MatButton, MatAnchor],
})
export class PrivateHeaderComponent {}
