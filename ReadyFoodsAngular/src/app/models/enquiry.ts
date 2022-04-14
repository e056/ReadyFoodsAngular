import { Customer } from "./customer"

export class Enquiry {
    enquiryId: number | undefined
    title: string | undefined
    description: string | undefined
    
    resolved: boolean | undefined | null
    response: string | undefined  

    customer: Customer | undefined;

    constructor(enquiryId?: number, title?: string, 
        description?: string, resolved?: boolean | null,
        response?: string) {
            this.enquiryId = enquiryId;
            this.title = title;
            this.description = description;
            this.resolved = resolved;
            this.response = response;
        }

}

