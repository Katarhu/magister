import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ImageUploadComponent } from '@features/analyses/components/image-upload/image-upload.component';
import { AnalysesListComponent } from '@features/analyses/components/analyses-list/analyses-list.component';
import { AnalysesStore } from '@features/analyses/store/analyses.store';
import { AnalysesListLoaderComponent } from '@features/analyses/components/analyses-list-loader/analyses-list-loader.component';

@Component({
  selector: 'app-analyses-page',
  templateUrl: './analyses-page.component.html',
  styleUrl: './analyses-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageUploadComponent, AnalysesListComponent, AnalysesListLoaderComponent],
})
export default class AnalysesPageComponent {
  private readonly analysisStore = inject(AnalysesStore);

  isAnalysesLoading = this.analysisStore.loading;
}
