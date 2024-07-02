export type SearchUserParams = {
  userIds?: string[];
  phones?: string[];
  login?: string;
  take?: number;
  skip?: number;
};

export type CheckExistUserParams = {
  phone: string;
  login: string;
};

export type ChangeBalanceParams = {
  userId: string;
  balance: string;
};

export enum TransactionType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}
