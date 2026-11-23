import type { PaymentModalProps } from "../../types";

export default function PaymentModal({
  amount,
  error,
  onAmountChange,
  onSubmit,
  onClose,
}: PaymentModalProps ) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Registrar pagamento
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Informe o valor pago pelo cliente.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Valor do pagamento (R$)
          </label>

          <input
            type="number"
            min="0.01"
            step="0.01"
            autoFocus
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder="0,00"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
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
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Confirmar pagamento
          </button>
        </div>

      </div>
    </div>
  );
}