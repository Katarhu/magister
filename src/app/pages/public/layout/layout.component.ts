import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicHeaderComponent } from 'src/app/components/public-header/public-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [PublicHeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
