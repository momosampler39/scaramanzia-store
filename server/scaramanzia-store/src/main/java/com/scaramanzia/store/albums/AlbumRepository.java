package com.scaramanzia.store.albums;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    @Query("""
       from Album a
       where lower(a.titulo) like lower(concat('%', :termino, '%'))
          or lower(a.artista) like lower(concat('%', :termino, '%'))
    """)
    List<Album> buscar(@Param("termino") String query);
}
