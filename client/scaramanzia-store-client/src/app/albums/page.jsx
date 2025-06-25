// src/app/albums/page.jsx

import Link from "next/link";
import { getAlbums } from "@/lib/api";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <main>
      <h1>Catálogo completo</h1>

      {albums.length === 0 ? (
        <p>No hay álbumes disponibles.</p>
      ) : (
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              <Link href={`/albums/${album.id}`}>
                {album.titulo} - {album.artista} (${album.precio})
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/">⬅ Volver al inicio</Link>
    </main>
  );
}
