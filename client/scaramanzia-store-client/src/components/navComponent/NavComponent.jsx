import Link from 'next/link';

export default function NavComponent() {
  return (
    <nav className='bg-blue-500 text-white h-[50px] flex items-center w-full' >
      <Link href="/">Inicio</Link>
      <Link href="/albums">Álbumes</Link>
      <Link href="/cart">🛒 Carrito</Link>
      <Link href="/albums/new">🛒 Agregar album </Link>
      <Link href="/admin/pedidos">Pedidos</Link>  
    </nav>
  );
}