import { AccessRightEnum } from "./access-right-enum";

export class Staff {

    staffId: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    staffType: AccessRightEnum | undefined;
    username: string | undefined;
    password: string | undefined;

    constructor(staffId?: number, firstName?: string,
        lastName?: string, staffType?: AccessRightEnum,
        username?: string, password?: string) {
            
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.staffType = staffType;
        this.username = username;
        this.password = password;
    }

}
