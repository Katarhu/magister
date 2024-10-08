import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrivateHeaderComponent } from '@components/private-header/private-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { AnalysesStore } from '@features/analyses/store/analyses.store';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-page.component.html',
  styleUrl: './private-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrivateHeaderComponent, RouterOutlet, FooterComponent],
})
export default class PrivatePageComponent {
  private readonly analysisStore = inject(AnalysesStore);

  ngOnInit() {
    this.analysisStore.fetchPredictedAnalysis();
  }
}
