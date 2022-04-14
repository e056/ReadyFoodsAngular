export class Customer {

    customerId: number | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    contactNumber: string | undefined;
    password: string | undefined;
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
        password?: string,
        email?: string,
        isBanned?: boolean,
        address?: string
    ) {
        this.customerId = customerId
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.contactNumber = contactNumber
        this.password = password
        this.email = email
        this.isBanned = isBanned
        this.address = address
    }


}
