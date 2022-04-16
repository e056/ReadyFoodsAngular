export class CommentEntity {

    commentId: number | undefined;
    commentDate: Date | undefined;
    description: string | undefined;
    customerName: string | undefined;

    constructor(commentId?: number, commentDate?: Date, description?: string, customerName?: string) {
        this.commentId = commentId;
        this.commentDate = commentDate;
        this.description = description;
        this.customerName = customerName;
    }

}
