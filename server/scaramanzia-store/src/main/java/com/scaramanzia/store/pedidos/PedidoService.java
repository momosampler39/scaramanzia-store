package com.scaramanzia.store.pedidos;

import com.scaramanzia.store.albums.Album;
import com.scaramanzia.store.albums.AlbumRepository;
import com.scaramanzia.store.pedidos.dto.ItemPedidoRequest;
import com.scaramanzia.store.pedidos.dto.PedidoRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        pedido.setEstado(EstadoPedido.PENDIENTE); // Estado inicial

        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        for (ItemPedidoRequest itemDto : dto.getItems()) {
            Album album = albumRepository.findById(itemDto.getAlbumId())
                    .orElseThrow(() -> new IllegalArgumentException("Álbum no encontrado con ID: " + itemDto.getAlbumId()));

            ItemPedido item = new ItemPedido();
            item.setAlbum(album);
            item.setCantidad(itemDto.getCantidad());
            item.setPrecioUnitario(album.getPrecio());
            item.setPedido(pedidoGuardado);

            itemPedidoRepository.save(item);
        }

        return pedidoGuardado;
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



}
