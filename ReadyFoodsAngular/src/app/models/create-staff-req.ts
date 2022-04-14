import { Staff } from '../models/staff';
export class CreateStaffReq {

  username: string | undefined;
  password: string | undefined;
  staffEntity: Staff | undefined;

  constructor(username?: string, password?: string, staffEntity?: Staff)
  {
    this.username = username;
    this.password = password;
    this.staffEntity = staffEntity;
  }
}
