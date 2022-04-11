import { IngredientUnit } from "./ingredient-unit";

export class Ingredient {

    ingredientId: number | undefined;
    name: string | undefined;
    description: string | undefined;
    ingredientUnit: IngredientUnit | undefined;
    unitPrice: number | undefined;
    reorderQuantity: number | undefined;
    stockQuantity: number | undefined;

    constructor(ingredientId?: number, name?: string, description?: string, ingredientUnit?: IngredientUnit, unitPrice?: number, reorderQuantity?: number, stockQuantity?: number) {
        this.ingredientId = ingredientId;
        this.name = name;
        this.description = description;
        this.ingredientUnit = ingredientUnit;
        this.unitPrice = unitPrice;
        this.reorderQuantity = reorderQuantity;
        this.stockQuantity = stockQuantity;
    }
}
