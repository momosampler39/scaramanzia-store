'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  if (cart.length === 0) {
    return <p>No hay productos en tu carrito.</p>;
  }

  return (
    <main>
      <h1>Resumen de tu compra</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.titulo} - ${item.precio} x {item.quantity}
          </li>
        ))}
      </ul>
      <hr />
      <p><strong>Total a pagar:</strong> ${total}</p>
      <button onClick={() => router.push('/checkout/success')}>
        Confirmar pago
      </button>
      <button onClick={() => router.push('/cart')}>
        Volver al carrito
      </button>
    </main>
  );
}
