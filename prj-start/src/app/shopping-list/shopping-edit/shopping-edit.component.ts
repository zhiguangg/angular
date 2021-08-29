import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', { static: false}) amountInput: ElementRef;
  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(){
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    const newIng = new Ingredient(ingName, ingAmount);
    this.shoppinglistService.addIngredient(newIng);
  }
}
