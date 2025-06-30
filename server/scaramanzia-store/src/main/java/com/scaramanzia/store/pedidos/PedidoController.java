package com.scaramanzia.store.pedidos;

import com.scaramanzia.store.pedidos.dto.ActualizarEstadoRequest;
import com.scaramanzia.store.pedidos.dto.PedidoRequest;
import com.scaramanzia.store.pedidos.dto.PedidoResponse;
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
    public ResponseEntity<PedidoResponse> crear(@Valid @RequestBody PedidoRequest dto) {
        Pedido creado = pedidoService.crear(dto);
        PedidoResponse respuesta = pedidoService.mapearAPedidoResponse(creado);
        return ResponseEntity
                .created(URI.create("/api/pedidos/" + creado.getId()))
                .body(respuesta);
    }

    // GET /api/pedidos
    @GetMapping
    public List<PedidoResponse> listar() {
        return pedidoService.listar().stream()
                .map(pedidoService::mapearAPedidoResponse)
                .toList();
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
        System.out.println("Estado recibido: " + request.getEstado());
        return pedidoService.actualizarEstado(id, request.getEstado());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        pedidoService.eliminar(id);
    }




}
