import { Category } from "./category";
import { CommentEntity } from "./comment-entity";
import { Ingredient } from "./ingredient";
import { Review } from "./review";

export class Recipe {

    recipeId: number | undefined;
    recipeTitle: string| undefined;
    recipeChef: string | undefined;
    cookingTime: number | undefined;
    recipeSteps: string | undefined;
    caloriesPerServing: number | undefined;
    carbsPerServing: number | undefined;
    fatsPerServing: number | undefined;
    proteinsPerServing: number | undefined;
    sugarPerServing: number | undefined;
    picUrl: string | undefined;
    videoURL: string | undefined;

    comments: CommentEntity[] | undefined | null;
    reviews: Review[] | undefined | null;
    ingredientSpecificationList: Ingredient[] | undefined | null;
    categories: Category[] | undefined | null;

    constructor(recipeId?: number, recipeTitle?: string, recipeChef?: string, cookingTime?: number, recipeSteps?: string,
        caloriesPerServing?: number, carbsPerServing?: number, fatsPerServing?: number,
        proteinsPerServing?: number, sugarPerServing?: number, videoURL?: string) {

        this.recipeId = recipeId;
        this.recipeTitle = recipeTitle;
        this.recipeChef = recipeChef;
        this.cookingTime = cookingTime;
        this.recipeSteps = recipeSteps;
        this.caloriesPerServing = caloriesPerServing;
        this.carbsPerServing = carbsPerServing;
        this.fatsPerServing = fatsPerServing;
        this.proteinsPerServing = proteinsPerServing;
        this.sugarPerServing = sugarPerServing;
        this.videoURL = videoURL;

    }
}