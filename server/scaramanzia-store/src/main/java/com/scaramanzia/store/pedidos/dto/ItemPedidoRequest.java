package com.scaramanzia.store.pedidos.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemPedidoRequest {

    @NotNull(message = "El ID del álbum es obligatorio")
    private Long albumId;

    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private int cantidad;
}