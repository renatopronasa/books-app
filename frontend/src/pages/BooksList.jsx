import { useEffect, useState } from "react";
import { api } from "../services/api";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadBooks() {
    try {
      setLoading(true);

      const response = await api.get("/books", {
        params: search ? { q: search } : {},
      });

      setBooks(response.data);
    } catch (err) {
      console.error("Erro ao carregar livros", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(bookData) {
    try {
      if (bookData instanceof FormData) {
        await api.post("/books", bookData);
      } else {
        await api.post("/books", bookData);
      }
      setIsModalOpen(false);
      loadBooks();
    } catch (err) {
      console.error("Erro ao criar livro", err);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      loadBooks();
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-semibold">Livros</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-2xl font-semibold text-black"
            >
              Novo
            </button>
          </div>
        </header>

        {isModalOpen && (
          <BookModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleCreate}
          />
        )}

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full bg-white rounded-lg h-14 px-6 pr-12 text-lg
                      placeholder-gray-400 shadow-sm border border-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadBooks()}
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                aria-label="Buscar"
                onClick={loadBooks}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Carregando livros...</p>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum livro encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={{
                    ...book,
                    image: book.image_url,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
