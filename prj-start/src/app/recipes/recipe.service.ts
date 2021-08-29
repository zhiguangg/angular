import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

// @Injectable({
//     providedIn: 'root'
//   })
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A test recipe','this is just a simple test recipe','https://c.ndtvimg.com/2020-02/vpm8qseg_kebab_625x300_11_February_20.jpg', [new Ingredient('meat', 1), new Ingredient('French Fries', 20)]),
        new Recipe('A test recipe2','this is just a simple test recipe','https://c.ndtvimg.com/2020-02/vpm8qseg_kebab_625x300_11_February_20.jpg', [new Ingredient('bun', 2), new Ingredient('onion', 5)]),
    ];
    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(id: number){
        return this.recipes[id];
    }

}