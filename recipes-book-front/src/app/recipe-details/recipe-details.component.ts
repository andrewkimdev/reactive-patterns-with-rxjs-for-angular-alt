import { Component } from '@angular/core';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {
  constructor(private sharedService: SharedDataService) {}
  selectedRecipe$ = this.sharedService.selectedRecipeAction$;

}
