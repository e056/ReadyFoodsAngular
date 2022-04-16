import { Recipe } from "./recipe";
export class OrderLineItem {
  orderLineItemId: number | undefined;
  recipeSubTotal: number | undefined;
  quantity: number | undefined;
  recipe: Recipe | undefined;

  constructor(orderLineItemId?: number, recipeSubTotal?: number,
    quantity?: number,recipe?: Recipe){
      this.orderLineItemId = orderLineItemId;
      this.quantity = quantity;
      this.recipe = recipe;
      this.recipeSubTotal = recipeSubTotal;

  }

}
