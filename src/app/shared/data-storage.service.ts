import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeBookService} from '../recipe-book/recipe-book.service';
import {Subject} from 'rxjs';
import {Recipe} from '../recipe-book/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  storeSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private recipeService: RecipeBookService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.storeSubject.next(true);
    this.http.put('https://angular-recipe-book-52bbb-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(resp => {
      setTimeout(() => {
        console.log(resp);
        this.storeSubject.next(false);
      }, 2500);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angular-recipe-book-52bbb-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
          const newRecipes = recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
          console.log(newRecipes);
          return newRecipes;
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
