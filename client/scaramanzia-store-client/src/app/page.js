import Link from "next/link";
import { getAlbums } from "@/lib/api";
import Image from "next/image";

export default async function HomePage() {
  const albums = await getAlbums();

  return (
    <main className="min-h-[calc(100dvh-55px)] bg-[#121212] text-white px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Título principal */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Bienvenido a{" "}
            <span className="text-[#1ED760]">Scaramanzia Records</span> 🎵
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Descubrí los álbumes más icónicos y construí tu propia colección
            musical.
          </p>
        </div>

        {/* Álbumes destacados */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Álbumes destacados</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albums.slice(0, 6).map((album) => (
              <li
                key={album.id}
                className="bg-[#181818] p-4 rounded-lg hover:bg-[#232323] transition duration-300 flex flex-row justify-center"
              >
                <div className="flex flex-row items-center justify-center gap-x-2">
                  <Image
                    src={album.portadaUrl}
                    width={500}
                    height={500}
                    alt={`${album.titulo}-image`}
                    className="object-cover  aspect-square cursor-pointer hover:opacity-90 transition duration-200 w-16 h-16 rounded-full border-2 border-gray-500"
                  />
                  <Link
                    href={`/albums/${album.id}`}
                    className="flex flex-col justify-center font-semibold text-white hover:underline"
                  >
                    <p> {album.titulo} </p>
                    <p className="text-sm text-gray-400">{album.artista}</p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Link a todos los álbumes */}
        <div className="mt-8">
          <Link
            href="/albums"
            className="inline-block bg-[#1ED760] hover:bg-[#1aa34a] text-black font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Ver todos los álbumes
          </Link>
        </div>
      </div>
    </main>
  );
}
