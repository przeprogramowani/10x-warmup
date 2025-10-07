import { describe, it, expect } from "vitest";
import { createAccount, processWithdrawal } from "./banking";
import { BankAccount, WithdrawalRequest } from "./types";

describe("Banking Operations", () => {
  describe("Account Creation", () => {
    it("should create a valid bank account", () => {
      const account: BankAccount = {
        id: "acc123",
        balance: 1000,
        currency: "USD",
        owner: {
          id: "own123",
          firstName: "John",
          lastName: "Doe",
        },
      };

      const result = createAccount(account);
      expect(result).toEqual(account);
    });

    it("should reject account creation with negative balance", () => {
      const account: BankAccount = {
        id: "acc123",
        balance: -100,
        currency: "USD",
        owner: {
          id: "own123",
          firstName: "John",
          lastName: "Doe",
        },
      };

      const result = createAccount(account);
      expect(result).toHaveProperty("code", "INVALID_AMOUNT");
      expect(result).toHaveProperty(
        "message",
        "❌ Account balance cannot be negative"
      );
    });

    it("should reject account creation with zero balance", () => {
      const account: BankAccount = {
        id: "acc123",
        balance: 0,
        currency: "USD",
        owner: {
          id: "own123",
          firstName: "John",
          lastName: "Doe",
        },
      };

      const result = createAccount(account);
      expect(result).toHaveProperty("code", "INVALID_AMOUNT");
      expect(result).toHaveProperty(
        "message",
        "❌ Initial account balance must be positive"
      );
    });
  });

  describe("Withdrawal Processing", () => {
    const account: BankAccount = {
      id: "acc123",
      balance: 1000,
      currency: "USD",
      owner: {
        id: "own123",
        firstName: "John",
        lastName: "Doe",
      },
    };

    it("should process valid withdrawal", () => {
      const withdrawal: WithdrawalRequest = {
        accountId: "acc123",
        amount: 500,
        currency: "USD",
        timestamp: new Date(),
      };

      const result = processWithdrawal(account, withdrawal);
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("transaction");
      if ("transaction" in result) {
        expect(result.transaction).toHaveProperty("remainingBalance", 500);
      }
    });

    it("should reject withdrawal with insufficient funds", () => {
      const withdrawal: WithdrawalRequest = {
        accountId: "acc123",
        amount: 1500,
        currency: "USD",
        timestamp: new Date(),
      };

      const result = processWithdrawal(account, withdrawal);
      expect(result).toHaveProperty("code", "INSUFFICIENT_FUNDS");
    });

    it("should reject withdrawal with invalid amount", () => {
      const withdrawal: WithdrawalRequest = {
        accountId: "acc123",
        amount: -100,
        currency: "USD",
        timestamp: new Date(),
      };

      const result = processWithdrawal(account, withdrawal);
      expect(result).toHaveProperty("code", "INVALID_AMOUNT");
    });

    it("should reject withdrawal with mismatched currency", () => {
      const withdrawal: WithdrawalRequest = {
        accountId: "acc123",
        amount: 500,
        currency: "EUR",
        timestamp: new Date(),
      };

      const result = processWithdrawal(account, withdrawal);
      expect(result).toHaveProperty("code", "INVALID_AMOUNT");
    });

    it("should reject withdrawal with invalid account ID", () => {
      const withdrawal: WithdrawalRequest = {
        accountId: "invalid_acc",
        amount: 500,
        currency: "USD",
        timestamp: new Date(),
      };

      const result = processWithdrawal(account, withdrawal);
      expect(result).toHaveProperty("code", "ACCOUNT_NOT_FOUND");
    });
  });
});
