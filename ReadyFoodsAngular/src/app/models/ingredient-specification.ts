import { Ingredient } from "./ingredient";
import { PreparationMethod } from "./preparation-method";

export class IngredientSpecification {

    ingredientSpecificationId: number | undefined;
    quantityPerServing: number | undefined;
    preperationMethod: PreparationMethod | undefined;
    ingredient: Ingredient | undefined

    constructor(ingredientSpecificationId?: number, quantityPerServing?: number, preparationMethod?: PreparationMethod, ingredient?: Ingredient) {
        this.ingredientSpecificationId = ingredientSpecificationId;
        this.quantityPerServing = quantityPerServing;
        this.preperationMethod = preparationMethod;
        this.ingredient = ingredient; //to check if required to remove
    }

}