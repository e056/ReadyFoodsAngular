import { Ingredient } from "./ingredient";

export class CreateIngredientReq {

    username: string | undefined;
    password: string | undefined;
    ingredient: Ingredient | undefined;

    constructor(username?: string, password?: string, ingredient?: Ingredient) {
        this.username = username;
        this.password = password;
        this.ingredient = ingredient;
    }
}