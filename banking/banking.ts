import {
  BankAccount,
  WithdrawalRequest,
  WithdrawalResult,
  WithdrawalError,
} from "./types";

function generateTransactionId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createAccount(
  account: BankAccount
): BankAccount | WithdrawalError {
  // Validate that initial balance is positive
  if (account.balance <= 0) {
    return {
      code: "INVALID_AMOUNT",
      message:
        account.balance < 0
          ? "❌ Account balance cannot be negative"
          : "❌ Initial account balance must be positive",
    };
  }

  // Return the account if validation passes
  return account;
}

export function processWithdrawal(
  account: BankAccount,
  withdrawal: WithdrawalRequest
): WithdrawalResult | WithdrawalError {
  // Validate account ID matches
  if (withdrawal.accountId !== account.id) {
    return {
      code: "ACCOUNT_NOT_FOUND",
      message: "❌ Account ID does not match",
    };
  }

  // Validate amount is positive
  if (withdrawal.amount <= 0) {
    return {
      code: "INVALID_AMOUNT",
      message: "❌ Withdrawal amount must be positive",
    };
  }

  // Validate currency matches
  if (withdrawal.currency !== account.currency) {
    return {
      code: "INVALID_AMOUNT",
      message: "❌ Currency does not match account currency",
    };
  }

  // Validate sufficient funds
  if (withdrawal.amount > account.balance) {
    return {
      code: "INSUFFICIENT_FUNDS",
      message: "❌ Insufficient funds for withdrawal",
    };
  }

  // Process successful withdrawal
  const newBalance = account.balance - withdrawal.amount;
  const transactionId = generateTransactionId();

  return {
    success: true,
    message: "Withdrawal processed successfully",
    transaction: {
      id: transactionId,
      amount: withdrawal.amount,
      currency: withdrawal.currency,
      timestamp: withdrawal.timestamp,
      remainingBalance: newBalance,
    },
  };
}
