import React from "react";

export default function ConfirmModal({
  title = "Tem certeza?",
  message = "Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?",
  confirmText = "Excluir",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md bg-[#F3F3F3] p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl font-semibold mb-4">{title}</h2>

        <p className="text-center text-sm text-gray-700 mb-8">{message}</p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-12 py-3 rounded-full bg-gray-300 text-gray-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-12 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
