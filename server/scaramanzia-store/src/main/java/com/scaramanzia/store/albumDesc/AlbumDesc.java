package com.scaramanzia.store.albumDesc;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlbumDesc {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotBlank(message = "El artista es obligatorio")
    private String artista;

    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @Min(value = 100, message = "El precio no puede ser menor a $100")
    private Double precio;

    private String genero;
    private String portadaUrl;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    private String linkDescarga;
}