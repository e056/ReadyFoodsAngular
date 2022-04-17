import { Ingredient } from './ingredient';

export class UpdateIngredientsReq {
  username: string;
  password: string;
  ingredient: Ingredient;

  constructor(username: string, password: string, ingredient: Ingredient) {
    this.username = username;
    this.password = password;
    this.ingredient = ingredient;
  }
}
