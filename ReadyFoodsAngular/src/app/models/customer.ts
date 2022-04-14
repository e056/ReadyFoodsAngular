export class Customer {

    customerId: number | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    contactNumber: string | undefined;
    email: string | undefined;
    isBanned: boolean | undefined;
    address: string | undefined;

    // not all attributes have been included yet


    constructor(
        customerId?: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        contactNumber?: string,
        email?: string,
        isBanned?: boolean,
        address?: string
    ) {
        this.customerId = customerId
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.contactNumber = contactNumber
        this.email = email
        this.isBanned = isBanned
        this.address = address
    }


}
