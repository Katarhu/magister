import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { UsersService } from '@features/users/services/users.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-preview-user-data',
  templateUrl: './preview-user-data.component.html',
  styleUrl: './preview-user-data.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatInput, AsyncPipe, MatFormField, MatLabel],
})
export class PreviewUserDataComponent {
  private readonly usersService = inject(UsersService);

  get user$() {
    return this.usersService.user$;
  }
}
