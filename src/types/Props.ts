import type { Customer } from ".";

export interface HeaderProps {
    setCustomerName: (name: string) => void;
    setCustomerError: (error: string) => void;
    setIsCustomerModalOpen: (isOpen: boolean) => void;
}

export interface DashboardProps {
    totalDebt: number;
    formatCurrency: (totalDebt: number) => string;
    customers: Customer[]
}

export interface DebitSectionProps {
    customers: Customer[]
    openPurchaseModal: (customerId: string) => void;
    openPaymentModal: (customerId: string) => void;
}

export interface CustomerModalProps {
  customerName: string;
  customerError: string;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export interface PurchaseModalProps {
  description: string;
  price: string;
  quantity: string;
  error: string;
  total: number;
  formatCurrency: (value: number) => string;

  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export interface PaymentModalProps {
  amount: string;
  error: string;

  onAmountChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}