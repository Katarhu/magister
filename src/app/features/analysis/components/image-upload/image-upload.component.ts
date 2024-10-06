import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageUploadFunctions } from 'src/app/features/analysis/components/image-upload/image-upload.functions';
import { NgClass } from '@angular/common';
import { ImageUploadConstants } from 'src/app/features/analysis/components/image-upload/image-upload.constants';
import { AnalysisStore } from 'src/app/features/analysis/store/analysis.store';
import { IAnalysisImage } from 'src/app/features/analysis/analysis.models';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon, NgClass],
})
export class ImageUploadComponent {
  private readonly snackbar = inject(MatSnackBar);
  private readonly analysisStore = inject(AnalysisStore);

  uploadedImage = signal<IAnalysisImage | null>(null);
  isHoveringOverDropZone = false;

  handleUploadImage(): void {
    if (this.uploadedImage() === null) return;

    this.analysisStore.predict({
      image: this.uploadedImage() as IAnalysisImage,
    });
  }

  handleFileSelectChange(event: Event): void {
    const file = ImageUploadFunctions.extractFileFromInput(event);

    this.prepareFile(file);
  }

  onFileDropped(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone = false;

    const file = ImageUploadFunctions.extractDataTransferFile(event);

    this.prepareFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone = true;
  }

  onDragLeave(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone = false;
  }

  private prepareFile(file: File | null): void {
    if (file === null) {
      this.snackbar.open('File is not uploaded or file type is incorrect.', 'Dismiss', {
        duration: 5000,
      });
      return;
    }

    const isFileTypeAllowed = ImageUploadFunctions.isImageTypeAllowed(file.type);

    if (!isFileTypeAllowed) {
      this.snackbar.open('Invalid file type. Please upload a JPEG, PNG.', 'Dismiss', {
        duration: 5000,
      });
      return;
    }

    this.readImage(file);
  }

  private async readImage(file: File): Promise<void> {
    const image = await ImageUploadFunctions.readImage(file);
    const imageSize = ImageUploadFunctions.calculateImageSizeMb(image.data);

    if (imageSize >= ImageUploadConstants.maxImageSizeMb) {
      this.snackbar.open(
        `Image size exceeds file limits. Maximum size is ${ImageUploadConstants.maxImageSizeMb}Mb.`,
        'Dismiss',
        {
          duration: 5000,
        },
      );
      return;
    }

    this.uploadedImage.set(image);
  }
}
