import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id :number;
  editMode = false;
  recipeForm : FormGroup;
  subscription :Subscription;

  constructor(private route : ActivatedRoute, private recipeService : RecipeService, 
    private router : Router) { }

  ngOnInit() {
    this.subscription=this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id']; // + sign to convert string into number
        this.editMode=params['id']!=null;
        this.initForm();
        //console.log(this.editMode);
      }
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDecription ='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeDecription=recipe.description;
      recipeImagePath=recipe.imagePath;
      if(recipe['ingredients'])
      
        for(let ingredient of recipe.ingredients )
        {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name,Validators.required),
              amount : new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
    }
    this.recipeForm= new FormGroup({
      'name':new FormControl(recipeName,Validators.required), // dont use () for required becoz angular call this function at the time of validation, just use refrence
      'imagePath' :new FormControl(recipeImagePath,Validators.required),
      'description' :new FormControl(recipeDecription,Validators.required),
      'ingredients' : recipeIngredients
      
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit()
  {
    const newRecipe= new Recipe(this.recipeForm.value['name'], // instead of using that step we can use this.recipeForm.value becoz all parameters name are same with recipe model
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['description'],
    this.recipeForm.value['ingredients']
    );
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id,newRecipe);
    }
    else
    {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  onCancel()
  {
    this.router.navigate(['../'],{relativeTo : this.route}); // will go one level up from current component

  }
  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name' : new FormControl(null,Validators.required),
          'amount' : new FormControl(null,[
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }
      )
    )
  }

  OnDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
