'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAlbumPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    descripcion: '',
    precio: '',
    genero: '',
    portadaUrl: '',
    stock: '',
    linkDescarga: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8081/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock),
        })
      });

      if (!res.ok) throw new Error('No se pudo crear el álbum');
      router.push('/albums');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Crear Nuevo Álbum</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label><br />
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
            <br />
          </div>
        ))}
        <button type="submit">Guardar Álbum</button>
      </form>
    </main>
  );
}
