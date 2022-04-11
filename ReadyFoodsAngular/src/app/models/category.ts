import { Recipe } from "./recipe";

export class Category {

    categoryId: number | undefined;
    name: string | undefined;
    description: string | undefined;

    parentCategory: Category | undefined;
    subCategories: Category[] | undefined;
    recipes: Recipe[] | undefined;

    constructor(categoryId?: number, name?: string, description?: string) {
        
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        
    }

}