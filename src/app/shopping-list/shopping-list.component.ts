import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientChangedSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSubs = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    });
    /*this.ingredients.push(new ingredient('Apples', 5));
    this.ingredients.push(new ingredient('Tomatoes', 10));*/
  }

  ngOnDestroy(): void {
    this.ingredientChangedSubs.unsubscribe();
  }

  onEditIngredient(ing: Ingredient) {
    this.shoppingListService.onEditIngredient(ing);
  }

  onDeleteIngredient(ingredient: Ingredient) {
    this.shoppingListService.removeIngredients(ingredient);
  }

}
