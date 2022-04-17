import { IngredientSpecification } from "./ingredient-specification";

export class CreateIngredientSpecificationReq {
    username: string | undefined;
    password: string | undefined;
    ingredientSpecification: IngredientSpecification | undefined;

    constructor(username?: string, password?: string, ingredientSpecification?: IngredientSpecification) {
    this.username = username;
    this.password = password;
    this.ingredientSpecification = ingredientSpecification;
}
}
