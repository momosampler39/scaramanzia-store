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
      return "orange";
    case "ENVIADO":
      return "dodgerblue";
    case "ENTREGADO":
      return "green";
    case "PAGADO":
      return "purple";
    case "CANCELADO":
      return "crimson";
    default:
      return "gray";
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

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (pedidos.length === 0) return <p>No hay pedidos aún.</p>;

  return (
    <main>
      <h1>Pedidos recibidos</h1>

      <label>
        Filtrar por estado:&nbsp;
        <select
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

      <br />
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginTop: 8, padding: 4 }}
      />
      <hr />

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
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p>
              Estado:&nbsp;
              <span
                style={{
                  background: colorEstado(p.estado),
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              >
                {p.estado}
              </span>
            </p>
            <select
              value={p.estado}
              onChange={(e) => actualizarEstadoPedido(p.id, e.target.value)}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="PAGADO">Pagado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
            <p>
              <strong>Pedido #{p.id}</strong> –{" "}
              {new Date(p.fecha).toLocaleString()}
            </p>
            <p>
              Cliente: {p.nombre} ({p.email})
            </p>
            <ul>
              {p.items.map((it) => (
                <li key={it.id}>
                  {it.album.titulo} – {it.cantidad} u. (${it.album.precio} c/u)
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> ${p.total}
            </p>
            <button onClick={() => confirmarEliminacion(p)}>Eliminar</button>
          </div>
        ))}

      {mensaje && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: 10,
            marginBottom: 10,
          }}
        >
          {mensaje}
        </div>
      )}

      {pedidoAEliminar && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <p>¿Estás seguro de eliminar el pedido #{pedidoAEliminar.id}?</p>
            <button onClick={eliminarPedido}>Sí, eliminar</button>
            <button onClick={cancelarEliminacion}>Cancelar</button>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            color: "white",
            background: "red",
            padding: 10,
            marginBottom: 10,
          }}
        >
          {error}
        </div>
      )}
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
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
};
