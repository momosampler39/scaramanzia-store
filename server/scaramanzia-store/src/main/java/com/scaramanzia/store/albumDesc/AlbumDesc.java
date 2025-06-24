package com.scaramanzia.store.albumDesc;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AlbumDesc {

    @NotBlank
    private String titulo;

    @NotBlank
    private String artista;

    @Size(max = 500)
    private String descripcion;

    @NotNull
    @Positive
    private Double precio;

    @NotBlank
    private String genero;

    private String portadaUrl;

    @NotNull
    @Min(0)
    private Integer stock;

    private String linkDescarga;
}
