import { OrderLineItem } from "./order-line-item";
import { Customer } from "./customer"
import { Status } from "./status"
export class OrderEntity {
  orderEntityId: number | undefined;
  numPax: number | undefined;
  totalCost: number | undefined;
  paid: boolean | undefined;
  dateOfOrder: Date | undefined;
  dateForDelivery: Date | undefined | null;
  status: Status | undefined;
  additionalNotes: string | undefined | null;
  orderLineItems: OrderLineItem | undefined;
  customer: Customer | undefined;

  constructor(orderEntityId?: number,numPax?: number,totalCost?: number,paid?: boolean
    ,dateOfOrder?: Date,dateForDelivery?: Date,status?: Status,additionalNotes?: string
    ,orderLineItems?: OrderLineItem,customer?: Customer){
      this.orderEntityId = orderEntityId;
      this.additionalNotes = additionalNotes;
      this.customer = customer;
      this.dateForDelivery = dateForDelivery;
      this.dateOfOrder = dateOfOrder;
      this.numPax = numPax;
      this.orderLineItems = orderLineItems;
      this.paid = paid;
      this.status = status;
      this.totalCost = totalCost;

  }




}
