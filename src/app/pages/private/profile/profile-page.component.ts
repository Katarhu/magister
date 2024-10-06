import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChangePasswordFormComponent
} from 'src/app/features/profile/components/change-password-form/change-password-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChangePasswordFormComponent],
})
export default class ProfilePageComponent {}
