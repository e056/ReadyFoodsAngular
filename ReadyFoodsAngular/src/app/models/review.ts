import { Customer } from "./customer";

export class Review {
    
    reviewId: number | undefined;
    reviewDate: Date | undefined;
    title: string | undefined;
    description: string | undefined;
    rating: number | undefined;

    customer: Customer | undefined;

    constructor(reviewId?: number, reviewDate?: Date, title?: string, description?: string, rating?: number) {
        this.reviewId = reviewId;
        this.reviewDate = reviewDate;
        this.title = title;
        this.description = description;
        this.rating = rating;
    }
    
}
