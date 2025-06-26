
import Link from "next/link";
import { getAlbums } from "@/lib/api";

export default async function HomePage() {
  const albums = await getAlbums();

  return (
    <main className="h-[calc(100dvh-55px)] bg-gradient" >
      <h1>Bienvenido a Scaramanzia Records 🎵</h1>

      <h2>Álbumes destacados</h2>
      <ul>
        {albums.slice(0, 6).map(album => (
          <li key={album.id}>
            <Link href={`/albums/${album.id}`}>{album.titulo}</Link> - {album.artista}
          </li>
        ))}
      </ul>

      <Link href="/albums">Ver todos los álbumes</Link>
    </main>
  );
}