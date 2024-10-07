import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageUploadComponent } from '@features/analysis/components/image-upload/image-upload.component';
import { AnalysesListComponent } from '@features/analysis/components/analyses-list/analyses-list.component';

@Component({
  selector: 'app-analyses-page',
  templateUrl: './analyses-page.component.html',
  styleUrl: './analyses-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageUploadComponent, AnalysesListComponent],
})
export default class AnalysesPageComponent {}
