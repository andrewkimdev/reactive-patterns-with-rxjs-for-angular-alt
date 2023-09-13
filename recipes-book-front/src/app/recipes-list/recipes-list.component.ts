import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { RecipesService } from '../core/services/recipes.service';

import { Recipe } from 'src/app/core/model/recipe.model';
import { Router } from '@angular/router';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {
  recipes$ = this.service.recipes$;
  /* The readonly stream */
  filterRecipesAction$ = this.service.filterRecipesAction$;
  filteredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) =>
      recipes.filter(recipe => this.matchesFilter(recipe, filter))
    ),
  );

  private matchesFilter(recipe: Recipe, filter: Recipe): boolean {
    const filterTitle = filter?.title?.toLowerCase() ?? '';
    return !!recipe.title?.toLowerCase().includes(filterTitle);
  }

  constructor(
    private router: Router,
    private service: RecipesService,
    private sharedService: SharedDataService,
  ) {
  }

  ngOnInit(): void {
  }

  onRating(event: any, recipe: Recipe) {
    console.log(event.value)
  }

  onCancelRating(recipe: Recipe) {
    console.log(recipe)
  }

  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelectedRecipe(recipe);
    this.router.navigateByUrl('/recipes/details');
  }
}
