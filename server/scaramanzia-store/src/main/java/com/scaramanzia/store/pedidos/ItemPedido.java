package com.scaramanzia.store.pedidos;

import com.scaramanzia.store.albums.Album;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemPedido {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;

    private Integer cantidad;
    private Double subtotal;

    private double precioUnitario;
}