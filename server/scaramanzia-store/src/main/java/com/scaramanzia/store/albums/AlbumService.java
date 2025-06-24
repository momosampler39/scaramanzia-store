package com.scaramanzia.store.albums;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository repo;


    public List<Album> listar() {
        return repo.findAll();
    }


    public Album obtener(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Álbum no encontrado con ID: " + id));
    }

    // Crear un nuevo álbum
    public Album crear(Album album) {
        album.setId(null); // Asegura que se cree uno nuevo
        return repo.save(album);
    }

    // Actualizar un álbum existente
    public Album actualizar(Long id, Album datos) {
        Album existente = obtener(id); // Lanza error si no existe

        existente.setTitulo(datos.getTitulo());
        existente.setArtista(datos.getArtista());
        existente.setDescripcion(datos.getDescripcion());
        existente.setPrecio(datos.getPrecio());
        existente.setGenero(datos.getGenero());
        existente.setPortadaUrl(datos.getPortadaUrl());
        existente.setStock(datos.getStock());
        existente.setLinkDescarga(datos.getLinkDescarga());

        return repo.save(existente);
    }

    // Eliminar un álbum
    public void eliminar(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Álbum con ID " + id + " no encontrado.");
        }
        repo.deleteById(id);
    }

    // Buscar por título o artista
    public List<Album> buscar(String termino) {
        return repo.buscar(termino);
    }
}
