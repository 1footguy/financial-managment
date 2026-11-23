import type { Customer } from "../types";

export function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export function normalizeName(name: string) {
  return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getCustomerDebt(customer: Customer) {
  return customer.transactions.reduce((total, transaction) => {
    const amount = transaction.quantity * transaction.unitPrice;

    return transaction.type === "PURCHASE"
      ? total + amount
      : total - amount;
  }, 0);
}

export function getDate() {
  return new Date().toISOString();
}