package com.scaramanzia.store.pedidos.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PedidoResponse {
    private Long id;
    private LocalDateTime fecha;
    private String estado;
    private String nombreCliente;
    private String emailCliente;
    private Double total;
    private List<ItemPedidoResponse> items;
}