"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const BASE_URL = "http://localhost:8081/api/albums";
  const imagenPorDefecto =
    "https://sonos-partner-documentation.s3.amazonaws.com/ReadMe-External/content-service-features/add-images/add-album-art/SonosApp-DefaultArt-Alone.png";

  const imagenValida = (url) => {
    return typeof url === "string" && url.startsWith("http");
  };

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
      const res = await fetch(BASE_URL, { cache: "no-store" });
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      alert("Error al cargar álbumes");
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
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      alert("Error al buscar álbumes");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (album) => setAlbumToDelete(album);
  const cancelDelete = () => setAlbumToDelete(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${albumToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar álbum");
      setAlbums(albums.filter((a) => a.id !== albumToDelete.id));
      setAlbumToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="bg-gradient">
      <h1>Álbumes Disponibles</h1>

      {/* 🔎 Buscador reactivo */}
      <input
        type="text"
        placeholder="Buscar por título o artista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando álbumes...</p>
      ) : (
        <section className="w-[95%] mx-auto max-w-[1550px] grid grid-cols-12 gap-4">
          {albums.map((album) => (
            <article
              key={album.id}
              className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  bg-[#1F1F1F] px-5 py-3 rounded-lg"
            >
              <Image
                src={
                  imagenValida(album.portadaUrl)
                    ? album.portadaUrl
                    : imagenPorDefecto
                }
                width={150}
                height={150}
                alt={`${album.titulo}-image`}
                className="object-cover rounded-xl w-full aspect-square mb-2 cursor-pointer"
                onClick={() => router.push(`/albums/${album.id}`)}
              />

              <p className="font-semibold truncate">{album.titulo}</p>
              <p className="text-xs mb-2 truncate">{album.artista} </p>
              <p className="mb-2"> ${album.precio} </p>

              <div className="flex flex-row gap-x-2">
                
                <button onClick={() => router.push(`/albums/${album.id}/edit`)}
                  className="cursor-pointer py-2 rounded-sm w-[50%] text-sm bg-[#3BE377] text-black font-semibold">
                  Editar
                </button>
                <button 
                className="cursor-pointer  py-2 rounded-sm  w-[50%] text-sm  text-white font-semibold"
                onClick={() => confirmDelete(album)}>Eliminar</button>
              </div>
            
            </article>
          ))}
        </section>
      )}

      {/* MODAL */}
      {albumToDelete && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p>
              ¿Estás seguro de eliminar <strong>{albumToDelete.titulo}</strong>?
            </p>
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
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
};
