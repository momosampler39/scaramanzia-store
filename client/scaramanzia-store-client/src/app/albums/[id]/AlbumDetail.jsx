"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AlbumDetail({ album }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [confirmandoEliminacion, setConfirmandoEliminacion] = useState(false);
  const [error, setError] = useState(null);

 const eliminarAlbum = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/albums/${album.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("Error al eliminar el álbum: " + errText);
    }

    console.log("Álbum eliminado exitosamente");
    router.push("/albums");
  } catch (err) {
    console.error("Error al eliminar:", err);
    setError(err.message);
  }
};


  if (!album) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient text-white">
        <p className="text-lg">Álbum no encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-[#1F1F1F] p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-8 items-start">
        <img
          src={album.portadaUrl}
          alt={album.titulo}
          width={250}
          height={250}
          className="rounded-lg object-cover shadow-lg aspect-square"
          style={{ viewTransitionName: `album-${album.id}` }}
        />

        <div className="flex flex-col gap-3 flex-1">
          <h1 className="text-3xl font-bold text-[#3BE377]">{album.titulo}</h1>

          <p>
            <span className="font-semibold text-gray-400">Artista:</span>{" "}
            {album.artista}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Género:</span>{" "}
            {album.genero}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Descripción:</span>{" "}
            {album.descripcion}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Precio:</span> $
            {album.precio}
          </p>
          <p>
            <span className="font-semibold text-gray-400">
              Stock disponible:
            </span>{" "}
            {album.stock}
          </p>

          <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-6">
            <button
              onClick={() => addToCart(album)}
              className="bg-[#3BE377] text-black font-bold py-2 px-6 rounded-md hover:brightness-110 transition"
            >
              Agregar al carrito
            </button>

            <button
              onClick={() => router.push("/albums")}
              className="border border-[#3BE377] text-[#3BE377] py-2 px-6 rounded-md hover:bg-[#3BE377] hover:text-black transition"
            >
              Volver
            </button>

            <button
              onClick={() => setConfirmandoEliminacion(true)}
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
            >
              Eliminar álbum
            </button>
          </div>

          {error && (
            <p className="mt-4 bg-red-600 text-white p-2 rounded">{error}</p>
          )}
        </div>
      </div>

      {confirmandoEliminacion && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-md text-white text-center max-w-sm">
            <p className="mb-4">
              ¿Estás seguro de que querés eliminar este álbum?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  console.log("Intentando eliminar álbum...");
                  eliminarAlbum();
                }}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                style={{ cursor: "pointer" }}
              >
                Sí, eliminar
              </button>
              <button
                type="button"
                onClick={() => setConfirmandoEliminacion(false)}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                style={{ cursor: "pointer" }}
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
