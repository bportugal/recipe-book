import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeBookService {

  // public recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  /*private recipes: Recipe[] = [
    new Recipe('Burger Recipe',
      'Burger with bacon and cheddar',
      'https://media-cdn.tripadvisor.com/media/photo-s/16/02/72/f9/duplo-com-pink-lemonade.jpg',
      [new Ingredient('Burger', 1), new Ingredient('Bun', 2)]),
    new Recipe('Tacos Recipe',
      'Delicious tacos',
      'https://img.itdg.com.br/images/recipes/000/073/984/347923/347923_original.jpg',
      [new Ingredient('Meat', 4), new Ingredient('Lettuce', 3)])
  ];*/

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // return this.recipes.find(value => value.name === name);
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(newRecipes: Recipe[]) {
    console.log(newRecipes);
    this.recipes = newRecipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
