import type { HeaderProps } from "../types";

export default function Header({ setCustomerName, setCustomerError, setIsCustomerModalOpen }: HeaderProps) {

    return (
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Controle financeiro
            </h1>

            <p className="text-sm text-gray-500">
              Gerenciamento em cache de vendas e pagamentos.
            </p>
          </div>

          <button
            onClick={() => {
              setCustomerName("");
              setCustomerError("");
              setIsCustomerModalOpen(true);
            }}
            className="rounded-lg bg-green-600 p-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Adicionar cliente
          </button>
        </header>
    )
}