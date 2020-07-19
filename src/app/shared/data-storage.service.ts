import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take,tap, map } from 'rxjs/operators';

export class DataStorageService
{
    constructor(private http : HttpClient, private recipeService : RecipeService, private authService : AuthService)
    {

    }
    storageRecipes()
    {
        const recipes= this.recipeService.getRecipes();
        this.http.put('https://ng-complete-guide-718b6.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            console.log(response);
        });
    }
     fetchRecipes()
     {
       return this.http
      .get<Recipe[]>(
        'https://ng-complete-guide-718b6.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipe(recipes);
      });
     } 

     /*fetchRecipes()
     {
       return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
          return this.http.get<Recipe[]>(
            'https://ng-complete-guide-718b6.firebaseio.com/recipes.json',
            {
              params: new HttpParams().set('auth', user.token)
            }
          );
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipe(recipes);
        })
       
      );
      
             
     }*/
}