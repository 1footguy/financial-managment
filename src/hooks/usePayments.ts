
import { useState } from "react";
import type { Customer, Transaction } from "../types";
import {
  getCustomerDebt,
  getDate,
} from "../helpers/generalHelper";

interface UsePaymentsProps {
  customers: Customer[];
  addTransaction: (
    customerId: string,
    transaction: Transaction
  ) => void;
}

export default function usePayments({
  customers,
  addTransaction,
}: UsePaymentsProps) {
  // UI state

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Form state

  const [paymentCustomerId, setPaymentCustomerId] = useState<string | null>(
    null
  );
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Modal handlers

  function openPaymentModal(customerId: string) {
    setPaymentCustomerId(customerId);
    setPaymentAmount("");
    setPaymentError("");
    setIsPaymentModalOpen(true);
  }

  function closePaymentModal() {
    setIsPaymentModalOpen(false);
  }

  // Payment handler

  function handleAddPayment() {
    const amountInCents = Math.round(Number(paymentAmount) * 100);

    if (
      !paymentAmount.trim() ||
      !Number.isSafeInteger(amountInCents) ||
      amountInCents <= 0
    ) {
      setPaymentError("Informe um valor válido.");
      return;
    }

    if (!paymentCustomerId) return;

    const customer = customers.find(
      (item) => item.id === paymentCustomerId
    );

    if (!customer) return;

    const currentDebt = getCustomerDebt(customer);

    if (amountInCents > currentDebt) {
      setPaymentError("O pagamento não pode ser maior que a dívida.");
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type: "PAYMENT",
      description: "Pagamento",
      quantity: 1,
      unitPrice: amountInCents,
      createdAt: getDate(),
    };

    addTransaction(paymentCustomerId, newTransaction);

    setPaymentAmount("");
    setPaymentError("");
    setIsPaymentModalOpen(false);
    setPaymentCustomerId(null);
  }

  return {
    isPaymentModalOpen,
    paymentAmount,
    paymentError,

    setPaymentAmount,
    setPaymentError,

    openPaymentModal,
    closePaymentModal,
    handleAddPayment,
  };
}
