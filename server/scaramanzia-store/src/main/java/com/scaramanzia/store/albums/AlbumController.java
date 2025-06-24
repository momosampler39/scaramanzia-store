package com.scaramanzia.store.albums;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor             // Lombok genera el constructor con el service
@CrossOrigin(origins = "*")         // Permite peticiones desde cualquier origen (útil para Next.js)
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

    // POST /api/albums
    @PostMapping
    public ResponseEntity<Album> crear(@RequestBody Album album) {
        Album creado = service.crear(album);
        return ResponseEntity
                .created(URI.create("/api/albums/" + creado.getId()))
                .body(creado);
    }

    // PUT /api/albums/{id}
    @PutMapping("/{id}")
    public Album actualizar(@PathVariable Long id, @RequestBody Album album) {
        return service.actualizar(id, album);
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
}
