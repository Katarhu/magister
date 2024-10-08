import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { AuthFacadeService } from '@features/auth/services/auth-facade.service';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatMenu, MatIcon, MatMenuTrigger, MatMiniFabButton, MatButton, MatAnchor],
})
export class PrivateHeaderComponent {
  private readonly authFacadeService = inject(AuthFacadeService);
  private readonly router = inject(Router);

  logout() {
    this.authFacadeService.logout$().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
