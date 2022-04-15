import { Category } from './category';

export class UpdateCategoryReq {
  username: string;
  password: string;
  category: Category;

  constructor(username: string, password: string, category: Category) {
    this.username = username;
    this.password = password;
    this.category = category;
  }
}
