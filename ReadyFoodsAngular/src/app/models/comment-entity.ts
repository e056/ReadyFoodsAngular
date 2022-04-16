export class CommentEntity {

    commentEntityId: number | undefined;
    commentDate: Date | undefined;
    description: string | undefined;
    customerName: string | undefined;

    constructor(commentEntityId?: number, commentDate?: Date, description?: string, customerName?: string) {
        this.commentEntityId = commentEntityId;
        this.commentDate = commentDate;
        this.description = description;
        this.customerName = customerName;
    }

}
