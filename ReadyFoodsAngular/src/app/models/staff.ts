import { AccessRightEnum } from "./access-right-enum";

export class Staff {

    firstName: string | undefined;
    lastName: string | undefined;
    staffType: AccessRightEnum | undefined;
    username: string | undefined;
    password: string | undefined;

    constructor(firstName?: string,
        lastName?: string, staffType?: AccessRightEnum,
        username?: string, password?: string) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.staffType = staffType;
        this.username = username;
        this.password = password;
    }

}
