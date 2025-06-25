'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const BASE_URL = 'http://localhost:8081/api/albums';

  useEffect(() => {
    fetchAlbums(); // carga inicial sin filtros
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchAlbums();
    }, 500); // espera 500ms desde la última tecla

    return () => clearTimeout(delayDebounce); // cancela si el usuario sigue escribiendo
  }, [query]);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL, { cache: 'no-store' });
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      alert('Error al cargar álbumes');
    } finally {
      setLoading(false);
    }
  };

  const searchAlbums = async () => {
    setLoading(true);
    try {
      const url = query.trim()
        ? `${BASE_URL}/search?termino=${encodeURIComponent(query)}`
        : BASE_URL;
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      alert('Error al buscar álbumes');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (album) => setAlbumToDelete(album);
  const cancelDelete = () => setAlbumToDelete(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${albumToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar álbum');
      setAlbums(albums.filter((a) => a.id !== albumToDelete.id));
      setAlbumToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
      <h1>Álbumes Disponibles</h1>

      {/* 🔎 Buscador reactivo */}
      <input
        type="text"
        placeholder="Buscar por título o artista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? <p>Cargando álbumes...</p> : (
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              <strong>{album.titulo}</strong> - {album.artista} (${album.precio})
              <br />
              <button onClick={() => router.push(`/albums/${album.id}`)}>Ver</button>
              <button onClick={() => router.push(`/albums/${album.id}/edit`)}>Editar</button>
              <button onClick={() => confirmDelete(album)}>Eliminar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}

      {/* MODAL */}
      {albumToDelete && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p>¿Estás seguro de eliminar <strong>{albumToDelete.titulo}</strong>?</p>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button onClick={cancelDelete}>Cancelar</button>
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
