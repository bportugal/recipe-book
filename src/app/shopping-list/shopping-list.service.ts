import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEdit = new Subject<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.callNextFunction();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.callNextFunction();
  }

  removeIngredients(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
    this.callNextFunction();
  }

  onEditIngredient(ingredient: Ingredient) {
    this.ingredientEdit.next(ingredient);
  }

  updateIngredient(ingredientIndex: number, name: string, amount: number) {
    this.ingredients[ingredientIndex].name = name;
    this.ingredients[ingredientIndex].amount = amount;
    this.callNextFunction();
  }

  callNextFunction() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
