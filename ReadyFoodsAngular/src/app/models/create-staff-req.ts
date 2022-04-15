import { Staff } from '../models/staff';
export class CreateStaffReq {

  username: string | undefined;
  password: string | undefined;
  newStaff: Staff | undefined;

  constructor(username?: string, password?: string, newStaff?: Staff)
  {
    this.username = username;
    this.password = password;
    this.newStaff = newStaff;
  }
}
