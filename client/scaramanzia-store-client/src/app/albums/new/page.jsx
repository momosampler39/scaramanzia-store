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
    <main>
      <h1>Crear Nuevo Álbum</h1>
      <form onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" onChange={handleChange} required />
        <input name="artista" placeholder="Artista" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        <input name="precio" placeholder="Precio" type="number" onChange={handleChange} required />
        <input name="genero" placeholder="Género" onChange={handleChange} required />
        <input name="portadaUrl" placeholder="URL de portada" onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" onChange={handleChange} required />
        <input name="linkDescarga" placeholder="Link de descarga" onChange={handleChange} required />
        <button type="submit">Crear álbum</button>
      </form>

      {showSuccess && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p>✅ Álbum creado exitosamente</p>
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