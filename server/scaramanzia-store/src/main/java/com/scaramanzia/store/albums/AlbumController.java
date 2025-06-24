package com.scaramanzia.store.albums;
import com.scaramanzia.store.albumDesc.AlbumDesc;

import com.scaramanzia.store.albumDesc.AlbumDesc;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlbumController {

    private final AlbumService service;

    // GET /api/albums
    @GetMapping
    public List<Album> listar() {
        return service.listar();
    }

    // GET /api/albums/{id}
    @GetMapping("/{id}")
    public Album obtener(@PathVariable Long id) {
        return service.obtener(id);
    }


    // PUT /api/albums/{id}
    @PutMapping("/{id}")
    public Album actualizar(@PathVariable Long id, @Valid @RequestBody AlbumDesc dto) {
        return service.actualizar(id, dto);
    }

    // DELETE /api/albums/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // GET /api/albums/search?termino=...
    @GetMapping("/search")
    public List<Album> buscar(@RequestParam String termino) {
        return service.buscar(termino);
    }

    // GET /api/albums/genero/{genero}
    @GetMapping("/genero/{genero}")
    public List<Album> porGenero(@PathVariable String genero) {
        return service.porGenero(genero);
    }

    // GET /api/albums/ordenar?campo=precio
    @GetMapping("/ordenar")
    public List<Album> ordenar(@RequestParam(defaultValue = "titulo") String campo) {
        return service.ordenarPor(campo);
    }

    // GET /api/albums/page?pagina=0&tamanio=10
    @GetMapping("/page")
    public Page<Album> paginar(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio
    ) {
        return service.paginados(pagina, tamanio);
    }

    @GetMapping("/busqueda")
    public Page<Album> buscarConFiltros(
            @RequestParam(defaultValue = "") String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "titulo") String sort,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort.Direction dir = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        return service.buscarConFiltros(q, pageable);
    }

    @PostMapping
    public ResponseEntity<Album> crear(@Valid @RequestBody AlbumDesc dto) {
        Album creado = service.crear(dto);
        return ResponseEntity.created(URI.create("/api/albums/" + creado.getId())).body(creado);
    }


    @GetMapping("/filtro")
    public Page<Album> filtrar(
            @RequestParam(defaultValue = "") String titulo,
            @RequestParam(defaultValue = "") String genero,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @RequestParam(defaultValue = "titulo") String ordenarPor,
            @RequestParam(defaultValue = "asc") String direccion
    ) {
        return service.filtrar(titulo, genero, pagina, tamanio, ordenarPor, direccion);
    }

    public Page<Album> filtrados(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @RequestParam(required = false) String genero,
            @RequestParam(defaultValue = "titulo") String ordenarPor,
            @RequestParam(defaultValue = "asc") String orden
    ) {
        return service.filtrados(pagina, tamanio, genero, ordenarPor, orden);
    }

    @GetMapping("/page/filtrar")
    public Page<Album> filtrarYOrdenar(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @RequestParam(required = false) String genero,
            @RequestParam(defaultValue = "titulo") String orden,
            @RequestParam(defaultValue = "asc") String direccion
    ) {
        return service.filtrarYOrdenar(pagina, tamanio, genero, orden, direccion);
    }

    @GetMapping("/page/filtrar")
    public Page<Album> filtrarAvanzado(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax,
            @RequestParam(defaultValue = "titulo") String orden,
            @RequestParam(defaultValue = "asc") String direccion
    ) {
        return service.filtrarAvanzado(pagina, tamanio, genero, precioMin, precioMax, orden, direccion);
    }

    @PatchMapping("/{id}")
    public Album actualizarParcialmente(@PathVariable Long id, @RequestBody Map<String, Object> campos) {
        return service.actualizarParcial(id, campos);
    }


}
