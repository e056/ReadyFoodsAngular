import { Recipe } from "./recipe";

export class CreateRecipeReq {

    username: string | undefined;
    password: string | undefined;
    recipe: Recipe | undefined;

    categoryIds: number[] | undefined;
    ingredientSpecificationIds: number[] | undefined;

    constructor(username?: string, password?: string, recipe?: Recipe, categoryIds?: number[], ingredientSpecificationIds?: number[]) {
        this.username = username;
        this.password = password;
        this.recipe= recipe;
        this.categoryIds = categoryIds;
        this. ingredientSpecificationIds = ingredientSpecificationIds;
    }
}
