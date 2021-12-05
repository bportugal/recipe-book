import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeBookService} from './recipe-book.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeBookService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length <= 0) {
      return this.dataStorageService.fetchRecipes(); //don't need to subscribe here, because the Resolver will subscribe for me to find out once data is there
    } else {
      return recipes;
    }
  }

}
