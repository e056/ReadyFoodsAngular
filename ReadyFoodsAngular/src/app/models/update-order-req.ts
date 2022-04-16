import { OrderEntity } from "./order-entity";
import { Status } from "./status";
export class UpdateOrderReq {
    username: string;
    password: string;
    order: OrderEntity;
    status: Status;


    constructor(username: string,
        password: string,
        order: OrderEntity,
        status: Status) {
        this.username = username;
        this.password = password;
        this.order = order;
        this.status = status;
    }
}
