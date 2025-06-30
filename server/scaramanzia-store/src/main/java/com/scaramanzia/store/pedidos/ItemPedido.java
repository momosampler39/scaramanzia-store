package com.scaramanzia.store.pedidos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.scaramanzia.store.albums.Album;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemPedido {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    private Album album;

    private int cantidad;

    private Double precioUnitario;

    private Double subtotal = 0.0;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    @JsonBackReference
    private Pedido pedido;

}