package com.scaramanzia.store.pedidos;

import com.scaramanzia.store.albums.Album;
import com.scaramanzia.store.albums.AlbumRepository;
import com.scaramanzia.store.pedidos.dto.ItemPedidoRequest;
import com.scaramanzia.store.pedidos.dto.ItemPedidoResponse;
import com.scaramanzia.store.pedidos.dto.PedidoRequest;
import com.scaramanzia.store.pedidos.dto.PedidoResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final AlbumRepository albumRepository;

    @Transactional
    public Pedido crear(PedidoRequest dto) {
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setNombreCliente(dto.getNombre());
        pedido.setEmailCliente(dto.getEmail());

        List<ItemPedido> items = new ArrayList<>();
        double total = 0.0;

        for (ItemPedidoRequest itemDto : dto.getItems()) {
            Album album = albumRepository.findById(itemDto.getAlbumId())
                    .orElseThrow(() -> new IllegalArgumentException("Álbum no encontrado con ID: " + itemDto.getAlbumId()));

            ItemPedido item = new ItemPedido();
            item.setAlbum(album);
            item.setCantidad(itemDto.getCantidad());
            item.setPrecioUnitario(album.getPrecio());


            item.setSubtotal(album.getPrecio() * itemDto.getCantidad());

            item.setPedido(pedido);
            items.add(item);
            total += item.getSubtotal();
        }

        pedido.setItems(items);
        pedido.setTotal(total);

        return pedidoRepository.save(pedido);
    }

    // 🔹 Obtener todos los pedidos
    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    public Pedido obtener(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Pedido no encontrado con ID: " + id));
    }

    @Transactional
    public Pedido actualizarEstado(Long id, EstadoPedido nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));

        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public void eliminar(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Pedido no encontrado con ID: " + id));

        itemPedidoRepository.deleteAllByPedidoId(id);
        pedidoRepository.delete(pedido);
    }

    public PedidoResponse mapearAPedidoResponse(Pedido pedido) {
        PedidoResponse response = new PedidoResponse();
        response.setId(pedido.getId());
        response.setFecha(pedido.getFecha());
        response.setEstado(pedido.getEstado().name());
        response.setNombreCliente(pedido.getNombreCliente());
        response.setEmailCliente(pedido.getEmailCliente());
        response.setTotal(pedido.getTotal());

        List<ItemPedidoResponse> items = pedido.getItems().stream().map(item -> {
            ItemPedidoResponse dto = new ItemPedidoResponse();
            dto.setId(item.getId());
            dto.setAlbumId(item.getAlbum().getId());
            dto.setTituloAlbum(item.getAlbum().getTitulo());
            dto.setCantidad(item.getCantidad());
            dto.setPrecioUnitario(item.getPrecioUnitario());
            dto.setSubtotal(item.getSubtotal());
            return dto;
        }).toList();

        response.setItems(items);
        return response;
    }



}
