interface IUser {
  id: number;
  username: string;
  companyName: string;
  rating: number;
}

class User implements IUser {
  readonly id: number;
  readonly username: string;
  readonly companyName: string;
  private _rating: number;

  constructor(id: number, username: string, companyName: string, rating?: number) {
    this.id = id;
    this.username = username;
    this.companyName = companyName;
    this._rating = rating ?? 0;
  }

  public get rating(): number {
    return this._rating;
  }

  public set rating(value: number) {
    this._rating = value;
  }
}

export { User };
export type { IUser };
