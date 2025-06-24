package com.scaramanzia.store.pedidos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

    // Elimina todos los ítems de un pedido específico
    void deleteAllByPedido(Pedido pedido);

    // Obtener los ítems de un pedido
    List<ItemPedido> findByPedido(Pedido pedido);

    void deleteAllByPedidoId(Long pedidoId);
}

