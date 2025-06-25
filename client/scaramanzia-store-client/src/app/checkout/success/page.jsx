'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Limpiar carrito automáticamente al llegar a esta página
    clearCart();
  }, [clearCart]);

  return (
    <main>
      <h1>¡Gracias por tu compra! 🛒</h1>
      <p>Tu pedido fue registrado con éxito. Te enviaremos el enlace de descarga por correo.</p>

      <button onClick={() => router.push('/')}>
        Volver al inicio
      </button>
    </main>
  );
}
