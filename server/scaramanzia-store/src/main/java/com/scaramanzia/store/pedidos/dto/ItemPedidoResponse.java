package com.scaramanzia.store.pedidos.dto;

import lombok.Data;

@Data
public class ItemPedidoResponse {
    private String tituloAlbum;
    private int cantidad;
    private double precioUnitario;
}