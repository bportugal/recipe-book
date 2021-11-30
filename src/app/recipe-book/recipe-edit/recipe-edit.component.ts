import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeBookService} from '../recipe-book.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private recipeService: RecipeBookService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((pa) => {
      this.isEditMode = pa.id != null;
      this.id = +pa.id;
      this.initForm();
    });
  }

  private initForm() {
    this.recipe = this.recipeService.getRecipe(this.id);

    this.recipeForm = this.formBuilder.group({
      name: [this.isEditMode ? this.recipe.name : null, Validators.required],
      imagePath: [this.isEditMode ? this.recipe.imagePath : null, Validators.required],
      description: [this.isEditMode ? this.recipe.description : null, Validators.required],
      ingredients: this.formBuilder.array([])
    });
    this.addArrayControls();
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray);
  }

  addArrayControls() {
    if (this.isEditMode && this.recipe.ingredients) {
      for (const ingredient of this.recipe.ingredients) {
        this.ingredients.push(this.formBuilder.group({
          name: [ingredient.name, Validators.required],
          amount: [ingredient.amount, [Validators.required, Validators.min(1)]]
        }));
      }
    } else {
      this.onAddIngredient();
    }
  }

  onAddIngredient() {
    this.ingredients.push(this.formBuilder.group({
      name: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    }));
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onRemoveAllIngredient() {
    this.ingredients.clear();
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    //const recipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, this.recipeForm.value.ingredients);
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
