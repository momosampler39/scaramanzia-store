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

}
