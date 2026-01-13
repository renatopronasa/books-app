import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import BookModal from "../components/BookModal";
import ConfirmModal from "../components/ConfirmModal";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  async function handleUpdate(updatedData) {
    if (updatedData instanceof FormData) {
      await api.put(`/books/${id}`, updatedData);
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    } else {
      await api.put(`/books/${id}`, updatedData);
      setBook((prev) => ({
        ...prev,
        title: updatedData.title ?? prev.title,
        author: updatedData.author ?? prev.author,
        description: updatedData.description ?? prev.description,
        published_at: typeof updatedData.publishedAt !== 'undefined' ? updatedData.publishedAt : prev.published_at,
        image_url: typeof updatedData.image !== 'undefined' ? updatedData.image : prev.image_url,
      }));
    }
  }

  if (!book) return null;

  function formatDate(d) {
    if (!d) return "";
    const s = String(d).slice(0, 10);
    const parts = s.split('-');
    if (parts.length !== 3) return new Date(d).toLocaleDateString('pt-BR');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-2xl text-black"
        >
          <span className="text-4xl font-semibold">{"<"}</span>
          <span className="text-2xl font-semibold">Voltar</span>
        </button>

        <div className="flex gap-6 text-2xl font-semibold">
          <button
            className="text-black"
            onClick={() => setIsModalOpen(true)}
          >
            Editar
          </button>

          <button
            className="text-red-600"
            onClick={() => setIsConfirmOpen(true)}
          >
            Excluir
          </button>
        </div>
      </div>
      {isConfirmOpen && (
        <ConfirmModal
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={async () => {
            try {
              await api.delete(`/books/${id}`);
              setIsConfirmOpen(false);
              navigate(-1);
            } catch (err) {
              console.error('Erro ao excluir livro', err);
            }
          }}
        />
      )}

      <div className="max-w-5xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-12 items-start">
        <div>
          <h1 className="text-4xl font-semibold mb-4 text-gray-900">
            {book.title}
          </h1>

          <div className="flex gap-40 text-lg font-semibold text-black mb-6">
            <span>Por {book.author}</span>
            <span>
              Publicado em{" "}
              {formatDate(book.published_at)}
            </span>
          </div>

          <p className="text-base text-black leading-tight text-justify whitespace-pre-line">
            {book.description.replace(/\. /g, ".\n")}
          </p>
        </div>

        <div className="flex justify-center">
          {book.image_url ? (
            <img
              src={book.image_url}
              alt={book.title}
              className="w-full max-w-xs rounded-lg shadow-md"
            />
          ) : (
            <div className="text-gray-500">Sem imagem</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <BookModal
          initialData={{
            title: book.title,
            author: book.author,
            publishedAt: book.published_at,
            description: book.description,
            image: book.image_url,
          }}
          onSave={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
