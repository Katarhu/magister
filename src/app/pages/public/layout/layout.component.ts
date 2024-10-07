import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicHeaderComponent } from '@components/public-header/public-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PublicHeaderComponent, RouterOutlet, FooterComponent],
})
export default class LayoutComponent {}
