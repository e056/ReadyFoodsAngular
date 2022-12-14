import { Enquiry } from "./enquiry";

export class UpdateEnquiryReq {
    username: string | undefined;
    password: string | undefined;
    enquiry: Enquiry | undefined;
    response: string | undefined | null;
    resolved: boolean | undefined | null;


    constructor(
        username?: string,
        password?: string,
        enquiry?: Enquiry,
        description?: string | null,
        resolved?: boolean | null
    ) {
        this.username = username
        this.password = password
        this.enquiry = enquiry
        this.response = description
        this.resolved = resolved
    }




}
