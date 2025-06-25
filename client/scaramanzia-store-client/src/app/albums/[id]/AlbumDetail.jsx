'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';


export default function AlbumDetail({ album }) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (!album) return <p>Álbum no encontrado.</p>;

  return (
    <main>
      <h1>{album.titulo}</h1>
      <img src={album.portadaUrl} alt={album.titulo} width={200} />
      <p><strong>Artista:</strong> {album.artista}</p>
      <p><strong>Género:</strong> {album.genero}</p>
      <p><strong>Descripción:</strong> {album.descripcion}</p>
      <p><strong>Precio:</strong> ${album.precio}</p>
      <p><strong>Stock disponible:</strong> {album.stock}</p>

      <button onClick={() => addToCart(album)}>
        Agregar al carrito
      </button>

      <button onClick={() => router.push('/albums')}>
        Volver
      </button>
    </main>
  );
}
