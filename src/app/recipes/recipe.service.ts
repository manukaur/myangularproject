import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService
{
    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new EventEmitter<Recipe>();
    private recipes:Recipe[]=[
        new Recipe('A Test Recipe',
        'What else you need to say ?','https://www.freeiconspng.com/uploads/spices-for-recipe-png-13.png',
        [new Ingredient('Meat',2), new Ingredient('French fries',3)]),
        new Recipe('Another Test Recipe',
        'What else you need to say ?','https://www.freeiconspng.com/uploads/spices-for-recipe-png-13.png',
        [new Ingredient('Bun',2), new Ingredient('Butter',3)])
      ];

      getRecipes()
      {
          return this.recipes.slice(); // It will not return actual recipe array but a copy so that origional cannot be modified
      }
      getRecipeById(index :number)
      {
          return this.recipes[index];
      }

      setRecipe(recipeData:Recipe[]) // It wil override recipes with fetched data(data from DB)
      {
        this.recipes=recipeData;
        this.recipesChanged.next(this.recipes.slice());
      }
      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe:Recipe)
      {
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice()); // send updated copy of recipes
      }

      deleteRecipe(index :number)
      {
          this.recipes.splice(index,1);
          this.recipesChanged.next(this.recipes.slice());
      }
}