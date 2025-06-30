'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditAlbumPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/api/albums/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8081/api/albums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          precio: Number(form.precio),
          stock: Number(form.stock)
        })
      });
      if (!res.ok) throw new Error('Error al editar álbum');
      setShowSuccess(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    router.push('/albums');
  };

  if (!form) return <p className="text-white p-6">Cargando...</p>;

  return (
    <main className="min-h-screen bg-gradient flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[600px] bg-[#1F1F1F] text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#3BE377]">Editar Álbum</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className='text-xs font-semibold text-gray-500'>Titulo </label>
          <input name="titulo" value={form.titulo} onChange={handleChange} required placeholder="Título"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Artista </label>
          <input name="artista" value={form.artista} onChange={handleChange} required placeholder="Artista"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Descripcion </label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required placeholder="Descripción"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:border-[#3BE377] transition-all" />

        <label className='text-xs font-semibold text-gray-500'>Precio </label>
          <input name="precio" type="number" value={form.precio} onChange={handleChange} required placeholder="Precio"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Genero </label>
          <input name="genero" value={form.genero} onChange={handleChange} required placeholder="Género"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Link de Portada </label>
          <input name="portadaUrl" value={form.portadaUrl} onChange={handleChange} required placeholder="URL de Portada"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Stock </label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="Stock"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />
          
          <label className='text-xs font-semibold text-gray-500'>Link de descarga </label>
          <input name="linkDescarga" value={form.linkDescarga} onChange={handleChange} required placeholder="Link de Descarga"
            className="bg-[#0A0A0A] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#3BE377] transition-all" />


          <button type="submit"
            className="mt-4 bg-[#3BE377] text-black font-semibold py-2 rounded-md hover:brightness-110 transition-all">
            Guardar cambios
          </button>
        </form>
      </div>

      {showSuccess && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p className="text-black font-medium">✅ Cambios guardados con éxito</p>
            <button onClick={closeModal}
              className="mt-4 bg-[#3BE377] text-black font-semibold px-4 py-2 rounded-md hover:brightness-110 transition-all">
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
    background: '#fff', padding: '30px', borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    textAlign: 'center',
    minWidth: '300px'
  }
};
