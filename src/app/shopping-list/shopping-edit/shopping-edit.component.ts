import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
@ViewChild ('f', {static :false}) slForm : NgForm;
 subscription : Subscription;
 editMode=false;
 editedItemIndex : number;
 editedItem : Ingredient;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.shoppingList.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.shoppingList.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form:NgForm)
  {
    const value=form.value;
    const newIngredient= new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.shoppingList.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
      this.shoppingList.addIngredient(newIngredient);

    }
    this.editMode=false;
    this.slForm.reset();
   
  }
  onClear()
  {
    this.slForm.reset();
    this.editMode=false;
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe(); // to avoid memory leaks
  }

  onDelete()
  {
    this.shoppingList.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
