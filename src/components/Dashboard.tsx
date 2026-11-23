import type { DashboardProps } from "../types";

export default function Dashboard({ totalDebt, formatCurrency, customers }: DashboardProps) {
    
    return (
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total a receber</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {formatCurrency(totalDebt)}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {customers.length}{" "}
            {customers.length === 1
              ? "cliente cadastrado"
              : "clientes cadastrados"}
          </p>
        </section>
    )
}