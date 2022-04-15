import { AccessRightEnum } from './access-right-enum';

export class Staff {
  staffId: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  staffType: String | undefined;
  username: string | undefined;
  password: string | undefined;
  salt: string | undefined

  constructor(
    staffId?: number,
    firstName?: string,
    lastName?: string,
    staffType?: String,
    username?: string,
    password?: string,
    salt?:string
  ) {
    this.staffId = staffId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.staffType = staffType;
    this.username = username;
    this.password = password;
    this.salt = salt;
  }
}
