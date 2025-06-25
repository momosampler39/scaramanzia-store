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

  if (!form) return <p>Cargando...</p>;

  return (
    <main>
      <h1>Editar Álbum</h1>
      <form onSubmit={handleSubmit}>
        <input name="titulo" value={form.titulo} onChange={handleChange} required />
        <input name="artista" value={form.artista} onChange={handleChange} required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
        <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
        <input name="genero" value={form.genero} onChange={handleChange} required />
        <input name="portadaUrl" value={form.portadaUrl} onChange={handleChange} required />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
        <input name="linkDescarga" value={form.linkDescarga} onChange={handleChange} required />
        <button type="submit">Guardar cambios</button>
      </form>

      {showSuccess && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p>✅ Cambios guardados con éxito</p>
            <button onClick={closeModal}>Aceptar</button>
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
    textAlign: 'center'
  }
};
