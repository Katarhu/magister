import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ImageUploadComponent } from '@features/analysis/components/image-upload/image-upload.component';
import { AnalysesListComponent } from '@features/analysis/components/analyses-list/analyses-list.component';
import { AnalysisStore } from '@features/analysis/store/analysis.store';
import { AnalysesListLoaderComponent } from '@features/analysis/components/analyses-list-loader/analyses-list-loader.component';

@Component({
  selector: 'app-analyses-page',
  templateUrl: './analyses-page.component.html',
  styleUrl: './analyses-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageUploadComponent, AnalysesListComponent, AnalysesListLoaderComponent],
})
export default class AnalysesPageComponent {
  private readonly analysisStore = inject(AnalysisStore);

  isAnalysesLoading = this.analysisStore.loading;
}
