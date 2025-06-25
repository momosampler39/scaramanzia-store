package com.scaramanzia.store.pedidos;

import com.scaramanzia.store.pedidos.dto.ActualizarEstadoRequest;
import com.scaramanzia.store.pedidos.dto.PedidoRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class PedidoController {

    private final PedidoService pedidoService;

    // POST /api/pedidos
    @PostMapping
    public ResponseEntity<Pedido> crear(@Valid @RequestBody PedidoRequest dto) {
        Pedido creado = pedidoService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/pedidos/" + creado.getId()))
                .body(creado);
    }

    // GET /api/pedidos
    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.listar();
    }

    // GET /api/pedidos/{id}
    @GetMapping("/{id}")
    public Pedido obtener(@PathVariable Long id) {
        return pedidoService.obtener(id);
    }

    @PutMapping("/{id}/estado")
    public Pedido actualizarEstado(
            @PathVariable Long id,
            @RequestBody ActualizarEstadoRequest request
    ) {
        return pedidoService.actualizarEstado(id, request.getEstado());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        pedidoService.eliminar(id);
    }





}
