import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, forkJoin, of, Subject, takeUntil } from 'rxjs';
import { catchError, concatMap, finalize, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RecipesService } from '../core/services/recipes.service';
import { UploadRecipesPreviewService } from '../core/services/upload-recipes-preview.service';

import * as recipeTags from '../core/model/tsgs';

@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
})
export class RecipeCreationComponent implements OnDestroy {
  recipeForm: FormGroup = this.formBuilder.group({
    id: Math.floor(1000 + Math.random() * 9000),
    title: [''],
    ingredients: [''],
    tags: [''],
    cookingTime: [''],
    yield: [''],
    prepTime: [''],
    steps: ['']
  });
  tags = recipeTags.TAGS;
  private counter: number = 0;

  private uploadedFilesSubject = new BehaviorSubject<File[]>([]);
  uploadedFiles$ = this.uploadedFilesSubject.asObservable();

  uploadRecipeImages$ = this.uploadedFiles$.pipe(
    switchMap(uploadedFiles =>
      forkJoin(
        uploadedFiles.map((file: File) =>
          this.uploadService.upload(this.recipeForm.value.id, file).pipe(
            catchError(errors => of(errors)),
            finalize(() => this.calculateProgressPercentage(++this.counter, uploadedFiles.length)),
          )
        ),
      ),
    ),
  );

  private uploadProgress: number = 0;
  private destroy$ = new Subject<void>();

  private _ = this.recipeForm.valueChanges.pipe(
    takeUntil(this.destroy$),
    concatMap(formValue => this.service.saveRecipe(formValue)),
    catchError(errors => of(errors)),
    tap(result => this.saveSuccess(result))
  ).subscribe();

  constructor(
    private formBuilder: FormBuilder,
    private service: RecipesService,
    private uploadService: UploadRecipesPreviewService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  saveSuccess(result: any) {
    console.log('Saved successfully');
  }

  onUpload(upload: { files: File[] }) {
    const { files } = upload;
    this.uploadedFilesSubject.next(files);
  }

  private calculateProgressPercentage(completedRequests: number, totalRequests: number) {
    this.uploadProgress = (completedRequests / totalRequests) * 100;
  }
}
