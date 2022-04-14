import { Customer } from "./customer"

export class Enquiry {
    enquiryId: number | undefined
    title: string | undefined
    description: string | undefined
    
    resolved: boolean | undefined
    response: string | undefined

    customer: Customer | undefined;

    constructor(enquiryId?: number, title?: string, 
        description?: string, resolved?: boolean,
        response?: string) {
            this.enquiryId = enquiryId;
            this.title = title;
            this.description = description;
            this.resolved = resolved;
            this.response = response;
        }

}

