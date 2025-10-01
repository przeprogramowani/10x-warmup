import { BankAccount, WithdrawalRequest, WithdrawalResult, WithdrawalError } from "./types";

function generateTransactionId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createAccount(account: BankAccount): BankAccount | WithdrawalError {
  if (account.balance < 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "Account balance cannot be negative",
    };
  }

  if (account.balance === 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "Initial account balance must be positive",
    };
  }

  return account;
}

export function processWithdrawal(
  account: BankAccount,
  withdrawal: WithdrawalRequest,
): WithdrawalResult | WithdrawalError {
  // TODO(human): Implement withdrawal processing logic with validation
}
