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
    <main className="bg-[#121212] min-h-screen w-full flex flex-col text-white font-sans">
      {/* 🟢 Header con título y búsqueda */}
      <div className="w-[95%] mx-auto max-w-[1550px] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Álbumes Disponibles
        </h1>

        <input
          type="text"
          placeholder="Buscar por título o artista"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-[#1F1F1F] border border-gray-700 focus:border-[#1ED760] outline-none py-2 px-4 rounded-md w-full max-w-md transition duration-300 ease-in-out text-white placeholder:text-gray-400"
        />
      </div>

      {/* 🟢 Contenido principal */}
      {loading ? (
        <p className="text-center text-gray-300 py-20">Cargando álbumes...</p>
      ) : (
        <section className="w-[95%] mx-auto max-w-[1550px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-20">
          {albums.map((album) => (
            <article
              key={album.id}
              className="bg-[#181818] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <Image
                src={
                  imagenValida(album.portadaUrl)
                    ? album.portadaUrl
                    : imagenPorDefecto
                }
                width={500}
                height={500}
                alt={`${album.titulo}-image`}
                className="object-cover rounded-md w-full aspect-square mb-4 cursor-pointer hover:opacity-90 transition duration-200"
                onClick={() => router.push(`/albums/${album.id}`)}
              />
              {/* <button
                  onClick={() => confirmDelete(album)}
                  className=" ml-auto p-1 text-sm border border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-semibold py-1 rounded transition duration-200"
                >
                  X
              </button> */}

              <div className="relative">
                
                <p className="font-semibold truncate text-sm">{album.titulo}</p>
                <p className="text-xs text-gray-400 mb-4 truncate">{album.artista}</p>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-sm text-[#1ED760] font-bold">
                    ${album.precio}
                  </p>
                  <button
                    onClick={() => router.push(`/albums/${album.id}/edit`)}
                    className=" text-sm px-6 bg-[#1ED760] hover:bg-[#1aa34a] text-black font-semibold py-1 rounded transition duration-200"
                  >
                    Editar
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                
              </div>
            </article>
          ))}
        </section>
      )}

      {/* 🔴 Modal de confirmación */}
      {albumToDelete && (
        <div style={styles.backdrop}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-sm w-full text-center space-y-4">
            <p className="text-lg font-semibold">
              ¿Eliminar <strong>{albumToDelete.titulo}</strong>?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sí, eliminar
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            </div>
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
