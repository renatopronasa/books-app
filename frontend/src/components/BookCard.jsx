import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      className="rounded-2xl overflow-hidden cursor-pointer transform hover:scale-[1.01] transition duration-150 shadow-sm border border-gray-200 bg-white"
    >
      <div className="bg-gray-200 h-56 flex items-center justify-center">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-400">Sem imagem</div>
        )}
      </div>

      <div className="px-4 py-4 bg-white">
        <h2 className="font-semibold text-lg">{book.title}</h2>
        <p className="text-sm text-gray-600 mt-3 line-clamp-3">{book.description}</p>
      </div>
    </div>
  );
}
