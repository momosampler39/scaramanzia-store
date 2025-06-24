package com.scaramanzia.store.pedidos.dto;

import com.scaramanzia.store.pedidos.EstadoPedido;

public class ActualizarEstadoRequest {
    private EstadoPedido estado;

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }
}
