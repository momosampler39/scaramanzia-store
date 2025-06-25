'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditAlbumPage() {
  const router = useRouter();
  const params = useParams(); // <--- Nuevo
  const id = params.id;       // <--- Acceso seguro

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8081/api/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          ...data,
          precio: data.precio.toString(),
          stock: data.stock.toString(),
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Error al cargar el álbum');
        router.push('/albums');
      });
  }, [id]);

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
      const res = await fetch(`http://localhost:8081/api/albums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock),
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar el álbum');
      router.push('/albums');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando álbum...</p>;

  return (
    <main>
      <h1>Editar Álbum</h1>
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </main>
  );
}
