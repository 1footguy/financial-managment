import type { CustomerModalProps } from "../../types";

export default function CustomerModal({
  customerName,
  customerError,
  onNameChange,
  onSubmit,
  onClose
}: CustomerModalProps ) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Novo cliente
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Informe o nome do cliente que deseja cadastrar.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nome
          </label>

          <input
            type="text"
            autoFocus
            value={customerName}
            onChange={(event) => onNameChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
            placeholder="Ex.: Maria Silva"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {customerError && (
          <p className="text-sm text-red-600">{customerError}</p>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>
            Cancelar
          </button>

          <button onClick={onSubmit}>
            Cadastrar
          </button>
        </div>

      </div>
    </div>
  );
}