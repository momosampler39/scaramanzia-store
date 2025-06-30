package com.scaramanzia.store.pedidos.dto;

import lombok.Data;

@Data
public class ItemPedidoResponse {
    private Long id;
    private Long albumId;
    private String tituloAlbum;
    private int cantidad;
    private double precioUnitario;
    private double subtotal;
}