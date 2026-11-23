
import { useState } from "react";
import type { Transaction } from "../types";
import { getDate } from "../helpers/generalHelper";

interface UsePurchasesProps {
  addTransaction: (
    customerId: string,
    transaction: Transaction
  ) => void;
}

export default function usePurchases({
  addTransaction,
}: UsePurchasesProps) {
  // UI state

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Form state

  const [purchaseCustomerId, setPurchaseCustomerId] = useState<string | null>(
    null
  );
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState("1");
  const [purchaseError, setPurchaseError] = useState("");

  // Derived values

  const purchaseTotal =
    Math.round(Number(purchasePrice || 0) * 100) *
    Number(purchaseQuantity || 0);

  // Modal handlers

  function openPurchaseModal(customerId: string) {
    setPurchaseCustomerId(customerId);
    setPurchaseDescription("");
    setPurchasePrice("");
    setPurchaseQuantity("1");
    setPurchaseError("");
    setIsPurchaseModalOpen(true);
  }

  function closePurchaseModal() {
    setIsPurchaseModalOpen(false);
  }

  // Purchase handler

  function handleAddPurchase() {
    const description = purchaseDescription.trim();
    const priceInCents = Math.round(Number(purchasePrice) * 100);
    const quantity = Number(purchaseQuantity);

    if (!description) {
      setPurchaseError("Informe a descrição do produto.");
      return;
    }

    if (
      !purchasePrice.trim() ||
      !Number.isSafeInteger(priceInCents) ||
      priceInCents <= 0
    ) {
      setPurchaseError("Informe um valor válido.");
      return;
    }

    if (
      !purchaseQuantity.trim() ||
      !Number.isSafeInteger(quantity) ||
      quantity <= 0
    ) {
      setPurchaseError("Informe uma quantidade válida.");
      return;
    }

    if (!purchaseCustomerId) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type: "PURCHASE",
      description,
      quantity,
      unitPrice: priceInCents,
      createdAt: getDate(),
    };

    addTransaction(purchaseCustomerId, newTransaction);

    setPurchaseDescription("");
    setPurchasePrice("");
    setPurchaseQuantity("1");
    setPurchaseError("");
    setIsPurchaseModalOpen(false);
    setPurchaseCustomerId(null);
  }

  return {
    isPurchaseModalOpen,
    purchaseDescription,
    purchasePrice,
    purchaseQuantity,
    purchaseError,
    purchaseTotal,

    setPurchaseDescription,
    setPurchasePrice,
    setPurchaseQuantity,
    setPurchaseError,

    openPurchaseModal,
    closePurchaseModal,
    handleAddPurchase,
  };
}
