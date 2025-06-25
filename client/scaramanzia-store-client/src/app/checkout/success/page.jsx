'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email) {
      setError('Completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:8081/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          items: cart.map(item => ({
            albumId: item.id,
            cantidad: item.quantity
          }))
        }),
      });

      if (!res.ok) throw new Error('Error al crear el pedido');

      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      setError(err.message);
    }
  };

  if (cart.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <main>
      <h1>Finalizar compra</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Confirmar pedido</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Resumen del carrito:</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.titulo} - ${item.precio} x {item.quantity}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ${total}</p>
    </main>
  );
}
