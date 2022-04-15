import { Category } from './category';

export class CreateCategoryReq {
  username: string | undefined;
  password: string | undefined;
  category: Category | undefined;
  parentId: number | undefined | null;

  constructor(
    username?: string,
    password?: string,
    category?: Category,
    parentId?: number | null
  ) {
    this.username = username;
    this.password = password;
    this.category = category;
    this.parentId = parentId;
  }
}
