import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeBookService} from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  selectedRecipe: Recipe;
  // constructor(private recipeService: RecipeBookService) { }
  constructor() { }

  ngOnInit(): void {
    /*this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });*/
  }


}
