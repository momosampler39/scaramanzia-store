import Link from 'next/link';

export default function NavComponent() {
  return (
    <nav className='absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white' >
      <Link href="/albums">Álbumes</Link>
      <Link href="/cart">🛒 Carrito</Link>
      <Link href="/albums/new">🛒 Agregar album </Link>
    </nav>
  );
}