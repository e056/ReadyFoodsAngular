export class Subscription {

    duration: number | undefined;
    numOfPeople: number | undefined;
    numOfRecipes: number | undefined;
    ongoing: boolean | undefined;
    remainingDuration: number | undefined;
    subscriptionId: number | undefined;
    subscriptionStartDate: Date | undefined;
    weeklyPrice: number | undefined;


  constructor(
    duration?: number , 
    numOfPeople?: number , 
    numOfRecipes?: number , 
    ongoing?: boolean , 
    remainingDuration?: number , 
    subscriptionId?: number , 
    subscriptionStartDate?: Date , 
    weeklyPrice?: number 
) {
    this.duration = duration
    this.numOfPeople = numOfPeople
    this.numOfRecipes = numOfRecipes
    this.ongoing = ongoing
    this.remainingDuration = remainingDuration
    this.subscriptionId = subscriptionId
    this.subscriptionStartDate = subscriptionStartDate
    this.weeklyPrice = weeklyPrice
  }

}
