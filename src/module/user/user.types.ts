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

export enum BalanceChangedStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum EventNameEnum {
  TransactionSaved = 'TransactionSaved',
  BalanceChanged = 'BalanceChanged',
}

export type EventTransactionSavedData = {
  userId: string;
  amount: string;
  transactionId: string;
  transactionType: TransactionType;
};

export type EventBalanceChangedData = {
  transactionId: string;
  status: BalanceChangedStatus;
};
