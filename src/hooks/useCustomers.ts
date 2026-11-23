
import { useEffect, useState } from "react";
import type { Customer, Transaction } from "../types";
import {
  normalizeName,
  getCustomerDebt,
} from "../helpers/generalHelper";

const STORAGE_KEY = "customer-debts";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const storedCustomers = localStorage.getItem(STORAGE_KEY);
      return storedCustomers ? JSON.parse(storedCustomers) : [];
    } catch {
      return [];
    }
  });

  // Persist customers

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch {
      console.error("Não foi possível salvar os dados no navegador.");
    }
  }, [customers]);

  // Derived values

  const totalDebt = customers.reduce(
    (total, customer) => total + getCustomerDebt(customer),
    0
  );

  // Customer handlers

  function addCustomer(name: string): string | null {
    const normalizedName = name.trim();

    if (!normalizedName) {
      return "Informe o nome do cliente.";
    }

    const alreadyExists = customers.some(
      (customer) =>
        normalizeName(customer.name) === normalizeName(normalizedName)
    );

    if (alreadyExists) {
      return "Já existe um cliente com esse nome.";
    }

    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: normalizedName,
      transactions: [],
    };

    setCustomers((current) => [...current, newCustomer]);

    return null;
  }

  // Transaction handlers

  function addTransaction(
    customerId: string,
    transaction: Transaction
  ) {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              transactions: [...customer.transactions, transaction],
            }
          : customer
      )
    );
  }

  return {
    customers,
    totalDebt,
    addCustomer,
    addTransaction,
  };
}
