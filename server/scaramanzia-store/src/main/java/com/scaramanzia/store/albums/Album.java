package com.scaramanzia.store.albums;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Album {
    @Id
    @GeneratedValue
    private Long id;

    private String titulo;
    private String artista;
    private String descripcion;
    private Double precio;
    private String genero;
    private String portadaUrl;
    private Integer stock;
    private String linkDescarga;
}
