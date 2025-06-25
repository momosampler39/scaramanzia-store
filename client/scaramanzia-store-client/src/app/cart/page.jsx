'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  if (cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  const router = useRouter();

  return (
    <main>
      <h1>Carrito de Compras</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p><strong>{item.titulo}</strong> - ${item.precio} x {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <hr />
      <p><strong>Total:</strong> ${total}</p>
      <button onClick={() => router.push('/checkout/success')}>
  Comprar ahora
</button>
      <button onClick={clearCart}>Vaciar carrito</button>
    </main>
  );
}
