import { useState } from "react";
import { formatCurrency, formatDate, getCustomerDebt } from '../helpers/generalHelper'
import type { DebitSectionProps } from "../types/Props";


export default function DebitSection({
  customers,
  openPurchaseModal,
  openPaymentModal,
}: DebitSectionProps) {

  const [search, setSearch] = useState("");
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(
      null
  );
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase().trim())
  );


  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Vendas em aberto</h2>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar cliente..."
          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            {customers.length === 0
              ? "Nenhum cliente cadastrado."
              : "Nenhum cliente encontrado."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((customer) => {
            const debt = getCustomerDebt(customer);
            const isExpanded = expandedCustomerId === customer.id;

            return (
              <article
                key={customer.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                {/* Customer summary */}

                <div className="flex items-center justify-between gap-4 px-4 py-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {customer.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {customer.transactions.length}{" "}
                      {customer.transactions.length === 1
                        ? "item"
                        : "itens"}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-500">Saldo devedor</p>

                    <p
                      className={`font-bold ${
                        debt > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {formatCurrency(debt)}
                    </p>
                  </div>
                </div>

                {/* Expand button */}

                <div className="border-t border-gray-100 px-5 py-3 flex justify-end">
                  <button
                    onClick={() =>
                      setExpandedCustomerId(isExpanded ? null : customer.id)
                    }
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {isExpanded ? "Ocultar detalhes" : "Mais detalhes"}
                  </button>
                </div>

                {/* Customer details */}

                {isExpanded && (
                  <div className="space-y-4 border-t border-gray-100 bg-gray-50 p-5">
                    <div className="flex flex-wrap gap-2  justify-center">
                      <button
                        onClick={() => openPurchaseModal(customer.id)}
                        className="rounded-md bg-green-600 p-2 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Adicionar produto
                      </button>

                      <button
                        onClick={() => openPaymentModal(customer.id)}
                        disabled={debt <= 0}
                        className="rounded-md bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Registrar pagamento
                      </button>
                    </div>

                    {/* Transaction history */}

                    <div>
                      <h4 className="mb-3 font-semibold text-gray-800">
                        Histórico de vendas
                      </h4>

                      {customer.transactions.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          Nenhuma venda registrada.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {[...customer.transactions]
                            .reverse()
                            .map((transaction) => {
                              const amount =
                                transaction.quantity * transaction.unitPrice;

                              const isPurchase =
                                transaction.type === "PURCHASE";

                              return (
                                <div
                                  key={transaction.id}
                                  className="flex items-center justify-between gap-3 rounded-lg bg-white p-3"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-gray-800">
                                      {transaction.description}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                      {formatDate(transaction.createdAt)}
                                      {isPurchase &&
                                        ` • ${transaction.quantity}x ${formatCurrency(
                                          transaction.unitPrice,
                                        )}`}
                                    </p>
                                  </div>

                                  <p
                                    className={`shrink-0 text-sm font-semibold ${
                                      isPurchase
                                        ? "text-red-600"
                                        : "text-green-600"
                                    }`}
                                  >
                                    {isPurchase ? "+" : "-"}
                                    {formatCurrency(amount)}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
