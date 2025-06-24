package com.scaramanzia.store.albums;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("""
       from Album a
       where lower(a.titulo) like lower(concat('%', :termino, '%'))
          or lower(a.artista) like lower(concat('%', :termino, '%'))
    """)
    List<Album> buscar(@Param("termino") String query);


    List<Album> findByGeneroIgnoreCase(String genero);


    Page<Album> findAll(Pageable pageable);


    @Query("""
    from Album a
    where lower(a.titulo) like lower(concat('%', :termino, '%'))
       or lower(a.artista) like lower(concat('%', :termino, '%'))
""")
    Page<Album> buscarPaginado(@Param("termino") String termino, Pageable pageable);

    boolean existsByTituloIgnoreCaseAndArtistaIgnoreCase(String titulo, String artista);


    //Verifica si ya existe otro álbum (con distinto ID) con el mismo título y artista.
    boolean existsByTituloIgnoreCaseAndArtistaIgnoreCaseAndIdNot(String titulo, String artista, Long id);

    //GET /api/albums/filtro?titulo=rock&genero=pop&pagina=0&tamanio=5&ordenarPor=precio&direccion=desc
    Page<Album> findByTituloContainingIgnoreCaseAndGeneroContainingIgnoreCase(
            String titulo,
            String genero,
            Pageable pageable
    );

    Page<Album> findByGeneroIgnoreCase(String genero, Pageable pageable);


    @Query("""
    SELECT a FROM Album a
    WHERE (:genero IS NULL OR LOWER(a.genero) = LOWER(:genero))
      AND (:precioMin IS NULL OR a.precio >= :precioMin)
      AND (:precioMax IS NULL OR a.precio <= :precioMax)
""")
    Page<Album> filtrarAvanzado(
            @Param("genero") String genero,
            @Param("precioMin") Double precioMin,
            @Param("precioMax") Double precioMax,
            Pageable pageable
    );

}
