import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';

const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`).pipe(
    catchError(error => of([])));

  constructor(private http: HttpClient) { }
}
