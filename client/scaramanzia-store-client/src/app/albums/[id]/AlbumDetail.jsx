'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function AlbumDetail({ album }) {
  const { addToCart } = useCart();
  return (
    <main>
      <h1>{album.titulo}</h1>
      <p><strong>Artista:</strong> {album.artista}</p>
      <p><strong>Género:</strong> {album.genero}</p>
      <p><strong>Precio:</strong> ${album.precio}</p>
      <p><strong>Stock disponible:</strong> {album.stock}</p>
      <p><strong>Descripción:</strong> {album.descripcion}</p>

      {album.portadaUrl && (
        <img
          src={album.portadaUrl}
          alt={`Portada de ${album.titulo}`}
          width={300}
        />
      )}

       <button onClick={() => addToCart(album)}>
        Agregar al carrito
      </button>

      <br />
      <Link href="/albums">⬅ Volver al catálogo</Link>
    </main>
  );
}
