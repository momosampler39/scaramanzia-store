package com.scaramanzia.store.albums;

import com.scaramanzia.store.albumDesc.AlbumDesc;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.ReflectionUtils;
import java.lang.reflect.Field;


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
        // VALIDACIONES DE NEGOCIO

        if (dto.getPrecio() < 100.0) {
            throw new IllegalArgumentException("El precio no puede ser menor a $100.");
        }

        if (dto.getStock() > 1000) {
            throw new IllegalArgumentException("El stock no puede superar las 1000 unidades.");
        }

        boolean existe = repository.existsByTituloIgnoreCaseAndArtistaIgnoreCase(dto.getTitulo(), dto.getArtista());
        if (existe) {
            throw new IllegalArgumentException("Ya existe un álbum con ese título y artista.");
        }


        // CONVERSIÓN A ENTIDAD
        Album album = new Album();
        album.setTitulo(dto.getTitulo());
        album.setArtista(dto.getArtista());
        album.setDescripcion(dto.getDescripcion());
        album.setGenero(dto.getGenero());
        album.setPrecio(dto.getPrecio());
        album.setPortadaUrl(dto.getPortadaUrl());
        album.setStock(dto.getStock());
        album.setLinkDescarga(dto.getLinkDescarga());

        return repository.save(album);
    }

    public Album actualizar(Long id, AlbumDesc dto) {
        Album existente = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Álbum no encontrado con id: " + id));

        boolean duplicado = repository.existsByTituloIgnoreCaseAndArtistaIgnoreCaseAndIdNot(
                dto.getTitulo(), dto.getArtista(), id
        );

        if (duplicado) {
            throw new IllegalArgumentException("Ya existe otro álbum con ese título y artista.");
        }

        existente.setTitulo(dto.getTitulo());
        existente.setArtista(dto.getArtista());
        existente.setDescripcion(dto.getDescripcion());
        existente.setGenero(dto.getGenero());
        existente.setPrecio(dto.getPrecio());
        existente.setPortadaUrl(dto.getPortadaUrl());
        existente.setStock(dto.getStock());
        existente.setLinkDescarga(dto.getLinkDescarga());

        return repository.save(existente);
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

    public Page<Album> filtrar(String titulo, String genero, int pagina, int tamanio, String ordenarPor, String direccion) {
        Pageable pageable = PageRequest.of(
                pagina,
                tamanio,
                direccion.equalsIgnoreCase("asc") ? Sort.by(ordenarPor).ascending() : Sort.by(ordenarPor).descending()
        );

        return repository.findByTituloContainingIgnoreCaseAndGeneroContainingIgnoreCase(titulo, genero, pageable);
    }

    public Page<Album> filtrados(int pagina, int tamanio, String genero, String ordenarPor, String orden) {
        Sort sort = orden.equalsIgnoreCase("desc") ? Sort.by(ordenarPor).descending() : Sort.by(ordenarPor).ascending();
        Pageable pageable = PageRequest.of(pagina, tamanio, sort);

        if (genero != null && !genero.isBlank()) {
            return repository.findByGeneroIgnoreCase(genero, pageable);
        } else {
            return repository.findAll(pageable);
        }


    }


    public Page<Album> filtrarYOrdenar(
            int pagina,
            int tamanio,
            String genero,
            String ordenCampo,
            String ordenDir
    ) {
        Pageable pageable = PageRequest.of(
                pagina,
                tamanio,
                Sort.by(Sort.Direction.fromString(ordenDir), ordenCampo)
        );

        if (genero != null && !genero.isBlank()) {
            return repository.findByGeneroIgnoreCase(genero, pageable);
        }

        return repository.findAll(pageable);
    }


    public Page<Album> filtrarAvanzado(
            int pagina,
            int tamanio,
            String genero,
            Double precioMin,
            Double precioMax,
            String ordenCampo,
            String ordenDir
    ) {
        Pageable pageable = PageRequest.of(
                pagina,
                tamanio,
                Sort.by(Sort.Direction.fromString(ordenDir), ordenCampo)
        );

        return repository.filtrarAvanzado(genero, precioMin, precioMax, pageable);
    }

    public Album actualizarParcial(Long id, Map<String, Object> campos) {
        Album album = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Álbum no encontrado"));

        ObjectMapper mapper = new ObjectMapper();
        campos.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Album.class, key);
            if (field != null) {
                field.setAccessible(true);
                Object convertedValue = mapper.convertValue(value, field.getType());
                ReflectionUtils.setField(field, album, convertedValue);
            }
        });

        return repository.save(album);
    }





}