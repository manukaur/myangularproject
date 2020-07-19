import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients : Ingredient[];
  constructor(private shoppingList : ShoppingListService) { }

  ngOnInit() {
    //console.log(this.shoppingList.getIngredients().values());
    this.ingredients=this.shoppingList.getIngredients();
  }
  onEditItem(index: number)
  {
    this.shoppingList.startedEditing.next(index); // we are passing index to service so that we can listen it in another component

  }
  

}
