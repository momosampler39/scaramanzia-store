package com.scaramanzia.store.albumDesc;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class AlbumDesc {

    @NotBlank(message = "El título no puede estar vacío")
    @Size(max = 100, message = "El título no puede tener más de 100 caracteres")
    private String titulo;

    @NotBlank(message = "El nombre del artista es obligatorio")
    @Size(max = 100, message = "El nombre del artista no puede tener más de 100 caracteres")
    private String artista;

    @Size(max = 500, message = "La descripción no puede tener más de 500 caracteres")
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser un valor positivo")
    private Double precio;

    @NotBlank(message = "El género musical es obligatorio")
    private String genero;

    @NotBlank(message = "La URL de la portada es obligatoria")
    private String portadaUrl;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    private String linkDescarga;  // Opcional
}
