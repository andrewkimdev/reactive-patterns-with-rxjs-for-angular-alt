import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RecipesService } from '../core/services/recipes.service';

import * as recipeTags from '../core/model/tsgs';

@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
})
export class RecipeCreationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private service: RecipesService) {
  }

  ngOnInit(): void {
  }

  recipeForm: FormGroup = this.formBuilder.group({
    id: Math.floor(1000 + Math.random() * 9000),
    title: [''],
    ingredients: [''],
    tags: [''],
    imageUrl: [''],
    cookingTime: [''],
    yield: [''],
    prepTime: [''],
    steps: ['']
  });

  tags = recipeTags.TAGS;
  valueChanges$ = this.recipeForm.valueChanges.pipe(
    debounceTime(500),
    switchMap(formValue => this.service.saveRecipe(formValue)),
    catchError(errors => of(errors)),
    tap(result => this.saveSuccess(result))
  );

  saveSuccess(result: any) {
    console.log('Saved successfully');
  }
}
