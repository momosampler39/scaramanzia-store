// "use client";

// import { useEffect, useState } from "react";

// export default function AdminPedidosPage() {
//   const [pedidoAEliminar, setPedidoAEliminar] = useState(null);
//   const [pedidos, setPedidos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // ⬅️ nuevo
//   const [filtroEstado, setFiltroEstado] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8081/api/pedidos", { cache: "no-store" })
//       .then((res) => {
//         if (!res.ok) throw new Error("No se pudo cargar la lista de pedidos");
//         return res.json();
//       })
//       .then((data) => {
//         setPedidos(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Error al cargar pedidos");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Cargando pedidos...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (pedidos.length === 0) return <p>No hay pedidos aún.</p>;

//   const confirmarEliminacion = (pedido) => {
//     setPedidoAEliminar(pedido);
//   };

//   const cancelarEliminacion = () => {
//     setPedidoAEliminar(null);
//   };

//   const eliminarPedido = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/pedidos/${pedidoAEliminar.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!res.ok) throw new Error("Error al eliminar el pedido");
//       setPedidos(pedidos.filter((p) => p.id !== pedidoAEliminar.id));
//       setPedidoAEliminar(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/pedidos/${pedidoId}/estado`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ estado: nuevoEstado }),
//         }
//       );

//       if (!res.ok) throw new Error("No se pudo actualizar el estado");

//       setPedidos(
//         pedidos.map((p) =>
//           p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
//         )
//       );
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <main>
//       <h1>Pedidos recibidos</h1>

//       <label>
//         Filtrar por estado:&nbsp;
//         <select
//           value={filtroEstado}
//           onChange={(e) => setFiltroEstado(e.target.value)}
//         >
//           <option value="">Todos</option>
//           <option value="PENDIENTE">Pendiente</option>
//           <option value="ENVIADO">Enviado</option>
//           <option value="ENTREGADO">Entregado</option>
//           <option value="PAGADO">Pagado</option>
//           <option value="CANCELADO">Cancelado</option>
//         </select>
//       </label>

//       {pedidos.map((p) => (
//         <div
//           key={p.id}
//           style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
//         >
//           <p>
//             Estado: <strong>{p.estado}</strong>
//           </p>
//           <select
//             value={p.estado}
//             onChange={(e) => actualizarEstadoPedido(p.id, e.target.value)}
//           >
//             <option value="PENDIENTE">Pendiente</option>
//             <option value="ENVIADO">Enviado</option>
//             <option value="ENTREGADO">Entregado</option>
//           </select>
//           <p>
//             <strong>Pedido #{p.id}</strong> –{" "}
//             {new Date(p.fecha).toLocaleString()}
//           </p>
//           <p>
//             Cliente: {p.nombre} ({p.email})
//           </p>
//           <ul>
//             {p.items.map((it) => (
//               <li key={it.id}>
//                 {it.album.titulo} – {it.cantidad} u. (${it.album.precio} c/u)
//               </li>
//             ))}
//           </ul>
//           <p>
//             <strong>Total:</strong> ${p.total}
//           </p>
//           <button onClick={() => confirmarEliminacion(p)}>Eliminar</button>
//         </div>
//       ))}
//       {pedidoAEliminar && (
//         <div style={styles.backdrop}>
//           <div style={styles.modal}>
//             <p>¿Estás seguro de eliminar el pedido #{pedidoAEliminar.id}?</p>
//             <button onClick={eliminarPedido}>Sí, eliminar</button>
//             <button onClick={cancelarEliminacion}>Cancelar</button>
//           </div>
//         </div>
//       )}
//       {error && (
//         <div
//           style={{
//             color: "white",
//             background: "red",
//             padding: 10,
//             marginBottom: 10,
//           }}
//         >
//           {error}
//         </div>
//       )}
//     </main>
//   );
// }

// const styles = {
//   backdrop: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//     textAlign: "center",
//   },
// };

"use client";

import { useEffect, useState } from "react";

function colorEstado(estado) {
  switch (estado) {
    case "PENDIENTE":
      return "#f59e0b"; // orange
    case "ENVIADO":
      return "#3b82f6"; // blue
    case "ENTREGADO":
      return "#22c55e"; // green
    case "PAGADO":
      return "#8b5cf6"; // purple
    case "CANCELADO":
      return "#dc2626"; // red
    default:
      return "#6b7280"; // gray
  }
}

export default function AdminPedidosPage() {
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/pedidos", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de pedidos");
        return res.json();
      })
      .then((data) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar pedidos");
        setLoading(false);
      });
  }, []);

  const confirmarEliminacion = (pedido) => {
    setPedidoAEliminar(pedido);
  };

  const cancelarEliminacion = () => {
    setPedidoAEliminar(null);
  };

  const eliminarPedido = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/pedidos/${pedidoAEliminar.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar el pedido");
      setPedidos(pedidos.filter((p) => p.id !== pedidoAEliminar.id));
      setPedidoAEliminar(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/pedidos/${pedidoId}/estado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );
      if (!res.ok) throw new Error("No se pudo actualizar el estado");

      setPedidos(
        pedidos.map((p) =>
          p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
        )
      );

      setMensaje("Estado actualizado correctamente");
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-white">Cargando pedidos...</p>;
  if (error) return <p className="text-red-500 font-medium">{error}</p>;
  if (pedidos.length === 0) return <p className="text-white h-24 w-full flex items-center justify-center">No hay pedidos aún.</p>;

  return (
    <main className="min-h-screen bg-gradient text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#3BE377]">Pedidos recibidos</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <label className="text-sm">
            Filtrar por estado:
            <select
              className="ml-2 p-1 rounded-md bg-[#0A0A0A] border border-gray-700 text-white"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="PAGADO">Pagado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </label>

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="p-2 rounded-md bg-[#0A0A0A] border border-gray-700 text-white"
          />
        </div>

        {mensaje && (
          <div className="bg-green-600 text-white p-3 rounded-md">
            {mensaje}
          </div>
        )}

        {pedidos
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .filter((p) => !filtroEstado || p.estado === filtroEstado)
          .filter(
            (p) =>
              (p.nombre?.toLowerCase() || "").includes(busqueda.toLowerCase()) ||
              (p.email?.toLowerCase() || "").includes(busqueda.toLowerCase())
          )
          .map((p) => (
            <div
              key={p.id}
              className="border border-gray-700 p-4 rounded-md bg-[#1F1F1F] shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                  Estado:
                  <span
                    className="ml-2 px-2 py-1 rounded text-sm font-semibold"
                    style={{ backgroundColor: colorEstado(p.estado), color: 'white' }}
                  >
                    {p.estado}
                  </span>
                </p>
                <select
                  value={p.estado}
                  onChange={(e) => actualizarEstadoPedido(p.id, e.target.value)}
                  className="p-1 rounded-md bg-[#0A0A0A] border border-gray-600 text-white"
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="ENVIADO">Enviado</option>
                  <option value="ENTREGADO">Entregado</option>
                  <option value="PAGADO">Pagado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
              </div>

              <p className="text-sm text-gray-300">
                <strong>Pedido #{p.id}</strong> – {new Date(p.fecha).toLocaleString()}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Cliente:</strong> {p.nombre || "(sin nombre)"}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> {p.email || "(sin email)"}
              </p>

              <ul className="mt-2 text-sm list-disc list-inside text-gray-400">
                {p.items.map((it) => (
                  <li key={it.id}>
                    {it.tituloAlbum} – {it.cantidad} u. (${it.precioUnitario} c/u)
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-[#3BE377]">Total: ${p.total || 0}</p>

              <button
                onClick={() => confirmarEliminacion(p)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          ))}

        {pedidoAEliminar && (
          <div style={styles.backdrop}>
            <div style={styles.modal}>
              <p>¿Estás seguro de eliminar el pedido #{pedidoAEliminar.id}?</p>
              <button
                onClick={eliminarPedido}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded mr-2"
              >
                Sí, eliminar
              </button>
              <button
                onClick={cancelarEliminacion}
                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md mt-4">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#1F1F1F",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "white"
  },
};
