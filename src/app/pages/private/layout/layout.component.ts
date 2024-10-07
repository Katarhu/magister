import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrivateHeaderComponent } from '@components/private-header/private-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrivateHeaderComponent, RouterOutlet, FooterComponent],
})
export default class LayoutComponent {}
