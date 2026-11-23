package com.ecocollecte.backend.repository;

import com.ecocollecte.backend.entity.Collecte;
import com.ecocollecte.backend.entity.StatutCollecte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollecteRepository extends JpaRepository<Collecte, Long> {

    List<Collecte> findByClientId(Long clientId);

    List<Collecte> findByStatut(StatutCollecte statut);

    List<Collecte> findByClientIdOrderByDateSouhaiteeDesc(Long clientId);
}