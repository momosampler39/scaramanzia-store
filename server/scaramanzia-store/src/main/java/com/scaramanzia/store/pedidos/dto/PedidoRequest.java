package com.scaramanzia.store.pedidos.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PedidoRequest {

    @NotEmpty(message = "La lista de ítems no puede estar vacía")
    private List<ItemPedidoRequest> items;

    @NotNull(message = "Debe especificarse el método de pago o algún dato adicional")
    private String metodoPago;

    @NotEmpty(message = "Debe ingresarse el nombre del cliente")
    private String nombre;

    @NotEmpty(message = "Debe ingresarse el email del cliente")
    private String email;
}
