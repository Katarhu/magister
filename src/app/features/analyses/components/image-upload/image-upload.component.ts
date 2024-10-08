import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageUploadFunctions } from '@features/analyses/components/image-upload/image-upload.functions';
import { NgClass } from '@angular/common';
import { ImageUploadConstants } from '@features/analyses/components/image-upload/image-upload.constants';
import { AnalysesStore } from '@features/analyses/store/analyses.store';
import { IAnalysisImage } from '@features/analyses/analyses.models';
import { MatCard } from '@angular/material/card';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon, NgClass, MatCard],
  animations: [
    trigger('appearAnimation', [
      transition(':enter', [
        style(ImageUploadConstants.uploadSectionInitialStyles),
        animate(
          ImageUploadConstants.uploadSectionEnterEasing,
          style(ImageUploadConstants.uploadSectionToEnteringStyles),
        ),
      ]),
      transition(':leave', [
        style(ImageUploadConstants.uploadSectionToEnteringStyles),
        animate(ImageUploadConstants.uploadSectionLeaveEasing, style(ImageUploadConstants.uploadSectionInitialStyles)),
      ]),
    ]),
  ],
})
export class ImageUploadComponent {
  private readonly snackbar = inject(MatSnackBar);
  private readonly analysesStore = inject(AnalysesStore);

  uploadedImage = signal<IAnalysisImage | null>(null);
  uploadedImageSrc = computed(() =>
    this.uploadedImage() === null ? null : `data:image/png;base64,${this.uploadedImage()!.data}`,
  );
  isHoveringOverDropZone = signal<boolean>(false);

  handleUploadImage(): void {
    if (this.uploadedImage() === null) return;

    this.analysesStore.predict({
      image: this.uploadedImage() as IAnalysisImage,
    });

    this.cleanUploadedImage();
  }

  cleanUploadedImage() {
    this.uploadedImage.set(null);
  }

  handleFileSelectChange(event: Event): void {
    const file = ImageUploadFunctions.extractFileFromInput(event);

    this.prepareFile(file);
  }

  onFileDropped(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone.set(false);

    const file = ImageUploadFunctions.extractDataTransferFile(event);

    this.prepareFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isHoveringOverDropZone.set(false);
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
