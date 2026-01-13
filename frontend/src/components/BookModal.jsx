import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function BookModal({ onSave, onClose, initialData }) {
  function isoToDisplay(iso) {
    if (!iso) return "";

    const s = String(iso).slice(0, 10);
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;

    const d = new Date(iso);
    if (!isNaN(d)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${dd}/${mm}/${yyyy}`;
    }

    console.warn('BookModal: publishedAt is not a valid ISO date:', iso);
    return "";
  }

  function displayToISO(display) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(display);
    if (!m) return null;
    const dd = m[1];
    const mm = m[2];
    const yyyy = m[3];
    const d = new Date(`${yyyy}-${mm}-${dd}`);
    if (isNaN(d)) return null;
    return `${yyyy}-${mm}-${dd}`;
  }

  function isValidDisplayDate(display) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(display);
    if (!m) return false;
    const dd = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    const yyyy = parseInt(m[3], 10);
    const d = new Date(yyyy, mm - 1, dd);
    return d && d.getFullYear() === yyyy && d.getMonth() + 1 === mm && d.getDate() === dd;
  }

  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [publishedAt, setPublishedAt] = useState(initialData?.publishedAt ? isoToDisplay(initialData.publishedAt) : "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [preview, setPreview] = useState(initialData?.image || null);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setImageChanged(true);
    setErrors(prev => ({ ...prev, image: undefined }));
  }

  function onPublishedChange(e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) v = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4,8)}`;
    else if (v.length >= 3) v = `${v.slice(0,2)}/${v.slice(2,4)}`;
    setPublishedAt(v);
    if (errors.publishedAt) setErrors(prev => ({ ...prev, publishedAt: undefined }));
  }

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = 'Título é obrigatório';
    if (!author.trim()) errs.author = 'Autor é obrigatório';
    if (!publishedAt) errs.publishedAt = 'Data de publicação é obrigatória';
    else if (!isValidDisplayDate(publishedAt)) errs.publishedAt = 'Formato inválido. Use dd/mm/aaaa';
    if (!description.trim()) errs.description = 'Descrição é obrigatória';
    const hasImage = !!(file || preview);
    if (!hasImage) errs.image = 'Imagem é obrigatória';
    return errs;
  }

  const isFormValid = Object.keys(validate()).length === 0;

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    const normalizedPublished = publishedAt ? displayToISO(publishedAt) : null;

    if (file) {
      const form = new FormData();
      form.append('title', title);
      form.append('author', author);
      form.append('publishedAt', normalizedPublished);
      form.append('description', description);
      form.append('image', file);

      if (onSave) {
        await onSave(form);
      } else {
        await api.post('/books', form);
      }
    } else {
      const payload = { title, author, publishedAt: normalizedPublished, description };

      if (imageChanged) payload.image = preview || "";

      if (onSave) {
        await onSave(payload);
      } else {
        await api.post('/books', payload);
      }
    }
    setErrors({});
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#F3F3F3] p-6 max-h-[80vh] overflow-y-auto rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl font-semibold mb-8">
          {initialData ? "Editar livro" : "Novo livro"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <input
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors(prev => ({ ...prev, title: undefined })); }}
              placeholder="Título"
              className="w-full rounded-xl px-6 py-4 bg-white shadow-sm focus:outline-none"
            />
            {errors.title && <p className="text-sm text-red-600 mt-2">{errors.title}</p>}

            <input
              value={author}
              onChange={(e) => { setAuthor(e.target.value); if (errors.author) setErrors(prev => ({ ...prev, author: undefined })); }}
              placeholder="Autor"
              className="w-full rounded-xl px-6 py-4 bg-white shadow-sm focus:outline-none"
            />
            {errors.author && <p className="text-sm text-red-600 mt-2">{errors.author}</p>}

            <input
              type="text"
              placeholder={dateFocused ? 'dd/mm/aaaa' : 'Data de Publicação'}
              value={publishedAt}
              onChange={onPublishedChange}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              className="w-full rounded-xl px-6 py-4 bg-white shadow-sm focus:outline-none"
            />
            {errors.publishedAt && <p className="text-sm text-red-600 mt-2">{errors.publishedAt}</p>}

        </div>
          <div className="flex justify-center">
            <div>
              <label className="w-52 h-52 bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-sm">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 text-gray-600 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M7 10l3-3 2 2 4-4 3 3"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Escolher imagem
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
              </label>
              {errors.image && <p className="text-sm text-red-600 mt-2 text-center">{errors.image}</p>}
            </div>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors(prev => ({ ...prev, description: undefined })); }}
          placeholder="Descrição"
          className="mt-6 w-full h-40 rounded-xl px-6 py-4 bg-white shadow-sm resize-none focus:outline-none"
        />
        {errors.description && <p className="text-sm text-red-600 mt-2">{errors.description}</p>}

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={onClose}
            className="px-12 py-3 rounded-full bg-gray-300 text-black"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-12 py-3 rounded-full ${isFormValid ? 'bg-sky-500 text-white' : 'bg-sky-200 text-white/70 cursor-not-allowed'}`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
