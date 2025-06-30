'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAlbumPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: '', artista: '', descripcion: '', precio: '',
    genero: '', portadaUrl: '', stock: '', linkDescarga: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8081/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, precio: Number(form.precio), stock: Number(form.stock) })
      });
      if (!res.ok) throw new Error('Error al crear álbum');
      setShowSuccess(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    router.push('/albums');
  };

  return (
    <main className="min-h-screen bg-gradient text-white px-4 py-10">
      <div className="max-w-[700px] mx-auto bg-[#1F1F1F] p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#3BE377] mb-6 text-center">
          Crear Nuevo Álbum
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="titulo"
            placeholder="Título"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="artista"
            placeholder="Artista"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            required
            rows={3}
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="precio"
            placeholder="Precio"
            type="number"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="genero"
            placeholder="Género"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="portadaUrl"
            placeholder="URL de portada"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />
          <input
            name="linkDescarga"
            placeholder="Link de descarga"
            onChange={handleChange}
            required
            className="bg-black border border-gray-600 rounded-md px-4 py-2 outline-none focus:border-[#3BE377]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#3BE377] text-black font-bold py-2 rounded-md hover:brightness-110 transition"
          >
            Crear álbum
          </button>
        </form>
      </div>

      {showSuccess && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p className="text-black font-semibold">✅ Álbum creado exitosamente</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-[#3BE377] rounded font-bold"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  backdrop: {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff', padding: '20px', borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    textAlign: 'center',
    minWidth: '300px'
  }
};
