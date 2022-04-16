import { Gender } from "./gender";
import { OrderEntity } from "./order-entity";

export class Customer {

    customerId: number | undefined;
    userName: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    contactNumber: string | undefined;
    email: string | undefined;
    isBanned: boolean | undefined;
    address: string | undefined;
    gender: Gender | undefined;
    amountSpent: number | undefined;
    dob: Date | undefined;
    orders: OrderEntity | undefined;

    // not all attributes have been included yet


    constructor(
        customerId?: number,
        userName?: string,
        firstName?: string,
        lastName?: string,
        contactNumber?: string,
        email?: string,
        isBanned?: boolean,
        address?: string,
        gender?: Gender,
        amountSpent?: number,
        dob?: Date

    ) {
        this.customerId = customerId
        this.userName = userName
        this.firstName = firstName
        this.lastName = lastName
        this.contactNumber = contactNumber
        this.email = email
        this.isBanned = isBanned
        this.address = address
        this.gender = gender
        this.amountSpent = amountSpent
        this.dob = dob

    }


}
