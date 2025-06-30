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
      setError('⚠️ Por favor completa todos los campos.');
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
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient text-white">
        <p className="text-xl">Tu carrito está vacío 🛒</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-[#1F1F1F] p-8 rounded-xl shadow-md space-y-8">
        <h1 className="text-3xl font-bold text-[#3BE377]">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0A0A0A] border border-gray-700 text-white focus:outline-none focus:border-[#3BE377] transition"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0A0A0A] border border-gray-700 text-white focus:outline-none focus:border-[#3BE377] transition"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="bg-[#3BE377] text-black font-bold py-2 px-6 rounded-md hover:brightness-110 transition"
          >
            Confirmar pedido
          </button>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-2">Resumen del carrito:</h2>
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between text-sm border-b border-gray-700 pb-1">
                <span>{item.titulo} x {item.quantity}</span>
                <span>${item.precio * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold text-[#3BE377]">Total: ${total}</p>
        </div>
      </div>
    </main>
  );
}