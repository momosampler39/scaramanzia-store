import Link from 'next/link';

export default function NavComponent() {
  return (
 <nav className="bg-[#0A0A0A] text-white h-[55px] w-full shadow-md border-b border-[#1F1F1F]">
  <div className="max-w-[1550px] w-[90%] mx-auto h-full flex items-center justify-between">
    
    {/* Logo o Inicio */}
    <Link href="/" className="text-lg font-bold hover:text-[#3BE377] transition duration-200">
      Scaramanzia 🎶
    </Link>

    {/* Enlaces principales */}
    <div className="flex gap-x-8 items-center text-sm font-medium">
      <Link href="/albums" className="hover:text-[#3BE377] transition duration-200">
        Álbumes
      </Link>
      <Link href="/cart" className="hover:text-[#3BE377] transition duration-200">
        🛒 Carrito
      </Link>
      <Link href="/albums/new" className="hover:text-[#3BE377] transition duration-200">
        ➕ Agregar álbum
      </Link>
    </div>

    {/* Admin */}
    <Link href="/admin/pedidos" className="text-sm hover:text-[#3BE377] transition duration-200">
      Pedidos
    </Link>
  </div>
</nav>

  );
}