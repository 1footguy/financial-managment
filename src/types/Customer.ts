export interface Transaction {
  id: string;
  type: "PURCHASE" | "PAYMENT";
  description: string;
  quantity: number;
  unitPrice: number; // Valor em centavos
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  transactions: Transaction[];
}