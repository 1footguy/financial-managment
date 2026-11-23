import type { PurchaseModalProps } from "../../types";

export default function PurchaseModal({
  description,
  price,
  quantity,
  error,
  total,
  formatCurrency,
  onDescriptionChange,
  onPriceChange,
  onQuantityChange,
  onSubmit,
  onClose,
}: PurchaseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Adicionar compra
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Registre uma nova compra para o cliente.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Descrição do produto
            </label>

            <input
              type="text"
              autoFocus
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="Nome do produto"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Valor da unidade
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(event) => onPriceChange(event.target.value)}
              placeholder="0,00"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Quantidade
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Total da compra</p>

            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(total)}
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            onClick={onSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cadastrar compra
          </button>
        </div>

      </div>
    </div>
  );
}