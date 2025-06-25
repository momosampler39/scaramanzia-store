// src/lib/api.js

const BASE_URL = "http://localhost:8081/api";

export async function getAlbums() {
  const res = await fetch(`${BASE_URL}/albums`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener álbumes");
  return res.json();
}

export async function getAlbumById(id) {
  const res = await fetch(`${BASE_URL}/albums/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Álbum no encontrado");
  return res.json();
}
