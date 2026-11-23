
import { useState } from "react";

import {
  formatCurrency,
} from "./helpers/generalHelper";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import DebitSection from "./components/DebitSection";

import CustomerModal from "./components/modals/CustomerModal";
import PurchaseModal from "./components/modals/PurchaseModal";
import PaymentModal from "./components/modals/PaymentModal";

import useCustomers from "./hooks/useCustomers";
import usePurchases from "./hooks/usePurchases";
import usePayments from "./hooks/usePayments";
import Footer from "./components/Footer";

// Component

export default function App() {
  // Customer state and handlers

  const {
    customers,
    totalDebt,
    addCustomer,
    addTransaction,
  } = useCustomers();

  // Purchase state and handlers

  const {
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
  } = usePurchases({ addTransaction });

  // Payment state and handlers

  const {
    isPaymentModalOpen,
    paymentAmount,
    paymentError,
    setPaymentAmount,
    setPaymentError,
    openPaymentModal,
    closePaymentModal,
    handleAddPayment,
  } = usePayments({ customers, addTransaction });

  // Customer form state

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerError, setCustomerError] = useState("");

  // Customer handlers

  function handleAddCustomer() {
    const error = addCustomer(customerName);

    if (error) {
      setCustomerError(error);
      return;
    }

    setCustomerName("");
    setCustomerError("");
    setIsCustomerModalOpen(false);
  }

  // Render

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 flex flex-col">
      <div className="self-center w-2/6 min-w-fit space-y-6">

        <Header
          setCustomerName={setCustomerName}
          setCustomerError={setCustomerError}
          setIsCustomerModalOpen={setIsCustomerModalOpen}
        />

        <Dashboard
          totalDebt={totalDebt}
          formatCurrency={formatCurrency}
          customers={customers}
        />

        <DebitSection
          customers={customers}
          openPurchaseModal={openPurchaseModal}
          openPaymentModal={openPaymentModal}
        />

      </div>
      
      {isCustomerModalOpen && (
        <CustomerModal
          customerName={customerName}
          customerError={customerError}
          onNameChange={(name) => {
            setCustomerName(name);
            setCustomerError("");
          }}
          onSubmit={handleAddCustomer}
          onClose={() => setIsCustomerModalOpen(false)}
        />
      )}

      {isPurchaseModalOpen && (
        <PurchaseModal
          description={purchaseDescription}
          price={purchasePrice}
          quantity={purchaseQuantity}
          error={purchaseError}
          total={purchaseTotal}
          formatCurrency={formatCurrency}
          onDescriptionChange={(value) => {
            setPurchaseDescription(value);
            setPurchaseError("");
          }}
          onPriceChange={(value) => {
            setPurchasePrice(value);
            setPurchaseError("");
          }}
          onQuantityChange={(value) => {
            setPurchaseQuantity(value);
            setPurchaseError("");
          }}
          onSubmit={handleAddPurchase}
          onClose={closePurchaseModal}
        />
      )}

      {isPaymentModalOpen && (
        <PaymentModal
          amount={paymentAmount}
          error={paymentError}
          onAmountChange={(value) => {
            setPaymentAmount(value);
            setPaymentError("");
          }}
          onSubmit={handleAddPayment}
          onClose={closePaymentModal}
        />
      )}
      <Footer />
    </main>
  );
}
