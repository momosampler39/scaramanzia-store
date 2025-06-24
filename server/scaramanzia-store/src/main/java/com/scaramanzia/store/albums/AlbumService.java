package com.scaramanzia.store.albums;

import com.scaramanzia.store.albumDesc.AlbumDesc;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository repository;

    public List<Album> listar() {
        return repository.findAll();
    }

    public Album obtener(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Album crear(AlbumDesc dto) {
        Album album = new Album();
        album.setTitulo(dto.getTitulo());
        album.setArtista(dto.getArtista());
        album.setDescripcion(dto.getDescripcion());
        album.setPrecio(dto.getPrecio());
        album.setGenero(dto.getGenero());
        album.setPortadaUrl(dto.getPortadaUrl());
        album.setStock(dto.getStock());
        album.setLinkDescarga(dto.getLinkDescarga());
        return repository.save(album);
    }

    public Album actualizar(Long id, Album actualizado) {
        Album original = obtener(id);

        original.setTitulo(actualizado.getTitulo());
        original.setArtista(actualizado.getArtista());
        original.setDescripcion(actualizado.getDescripcion());
        original.setPrecio(actualizado.getPrecio());
        original.setGenero(actualizado.getGenero());
        original.setPortadaUrl(actualizado.getPortadaUrl());
        original.setStock(actualizado.getStock());
        original.setLinkDescarga(actualizado.getLinkDescarga());

        return repository.save(original);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public List<Album> buscar(String termino) {
        return repository.buscar(termino);
    }

    // Filtro por género
    public List<Album> porGenero(String genero) {
        return repository.findByGeneroIgnoreCase(genero);
    }

    // Ordenar por campo
    public List<Album> ordenarPor(String campo) {
        return repository.findAll(Sort.by(Sort.Direction.ASC, campo));
    }

    // Paginación (devuelve una página con X elementos)
    public Page<Album> paginados(int pagina, int tamanio) {
        Pageable pageable = PageRequest.of(pagina, tamanio);
        return repository.findAll(pageable);
    }

    public Page<Album> buscarConFiltros(String termino, Pageable pageable) {
        if (termino == null || termino.trim().isEmpty()) {
            return repository.findAll(pageable);
        }
        return repository.buscarPaginado(termino.toLowerCase(), pageable);
    }



}
