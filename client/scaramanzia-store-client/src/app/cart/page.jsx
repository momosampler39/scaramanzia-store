'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient flex items-center justify-center text-white text-xl font-semibold">
        Tu carrito está vacío.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient text-white px-4 py-10">
      <div className="max-w-[800px] mx-auto bg-[#1F1F1F] rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-[#3BE377] text-center">Carrito de Compras</h1>

        <ul className="space-y-6">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 pb-4"
            >
              <div>
                <p className="font-semibold">{item.titulo}</p>
                <p className="text-sm text-gray-400">
                  ${item.precio} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 text-sm transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-lg font-bold">Total:</p>
          <p className="text-lg font-bold text-[#3BE377]">${total.toFixed(2)}</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => router.push('/checkout/success')}
            className="w-full py-2 bg-[#3BE377] text-black font-semibold rounded-md hover:brightness-110 transition"
          >
            Comprar ahora
          </button>
          <button
            onClick={clearCart}
            className="w-full py-2 border border-gray-500 text-white rounded-md hover:bg-gray-800 transition"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </main>
  );
}
