import Link from 'next/link';

export default function NavComponent() {
  return (
    <nav className='bg-[#0A0A0A] text-white h-[50px] flex items-center  w-full' >
      
      <div className='flex flex-row items-center h-[100%] justify-between w-[90%] max-w-[1550px] mx-auto '>
      <Link href="/">Inicio</Link>

      <div className='flex flex-row gap-x-6'>
      <Link href="/albums">Álbumes</Link>
      <Link href="/cart">🛒 Carrito</Link>
      <Link href="/albums/new">🛒 Agregar album </Link>
      </div>

      <Link href="/admin/pedidos">Pedidos</Link>  
      </div>
    </nav>
  );
}