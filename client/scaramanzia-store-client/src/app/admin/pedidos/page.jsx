'use client';

import { useEffect, useState } from 'react';

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ⬅️ nuevo

  useEffect(() => {
    fetch('http://localhost:8081/api/pedidos', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la lista de pedidos');
        return res.json();
      })
      .then(data => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar pedidos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (pedidos.length === 0) return <p>No hay pedidos aún.</p>;

  return (
    <main>
      <h1>Pedidos recibidos</h1>

      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p><strong>Pedido #{p.id}</strong> – {new Date(p.fecha).toLocaleString()}</p>
          <p>Cliente: {p.nombre} ({p.email})</p>
          <ul>
            {p.items.map(it => (
              <li key={it.id}>
                {it.album.titulo} – {it.cantidad} u. (${it.album.precio} c/u)
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${p.total}</p>
        </div>
      ))}
    </main>
  );
}
