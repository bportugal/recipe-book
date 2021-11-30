import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: 'shopping-list-edit.component.html',
  styleUrls: ['shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  /*@ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(name, amount) {
    this.shoppingListService.addIngredient(new Ingredient(name.nativeElement.value, amount.nativeElement.value));
  }*/

  @ViewChild('shoppingForm', {static: false}) shoppingForm: NgForm;
  name: string;
  amount: number;
  subscription: Subscription;
  ingredientIndex: number;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientEdit.subscribe((ingredient: Ingredient) => {
      this.name = ingredient.name;
      this.amount = ingredient.amount;
      this.ingredientIndex = this.shoppingListService.getIngredients().indexOf(ingredient);
      this.editMode = true;
    });
  }

  onSubmitIngredient() {
    /*const form = this.shoppingForm.value;
    this.shoppingListService.addIngredient(new Ingredient(form.name, form.amount));*/

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientIndex, this.name, this.amount);
    } else {
      this.shoppingListService.addIngredient(new Ingredient(this.name, this.amount));
    }
    this.onClearFields();
  }

  onClearFields() {
    this.editMode = false;
    this.shoppingForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
