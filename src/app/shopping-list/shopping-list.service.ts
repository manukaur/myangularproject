import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
  startedEditing= new Subject<number>();
   private ingredients : Ingredient[]=
   [
        new Ingredient('Bread',2),
        new Ingredient('Apple',5)
      ];

      getIngredients()
      {
          return this.ingredients; // slice is used so that we cant access origional
      }
      getIngredient(index :number)
      {
        return this.ingredients[index];
      }

      addIngredient(ingredient : Ingredient)
      {
        this.ingredients.push(ingredient);
      }

      addIngredientsToShoppingList(ingredients : Ingredient[])
      {
        this.ingredients.push(...ingredients); //spread operator of es6(turns an array of elements into a list of elements)
      }

      updateIngredient(index :number, newIngredient : Ingredient)
      {
        this.ingredients[index]=newIngredient;
        //this.startedEditing
      }

      deleteIngredient(index : number)
      {
        this.ingredients.splice(index,1);
      }
}