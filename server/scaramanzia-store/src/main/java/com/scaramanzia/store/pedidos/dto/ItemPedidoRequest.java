package com.scaramanzia.store.pedidos.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemPedidoRequest {
    @NotNull(message = "Debe especificarse el ID del álbum")
    private Long albumId;

    @Min(value = 1, message = "La cantidad mínima es 1")
    private int cantidad;
}
