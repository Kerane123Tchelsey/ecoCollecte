package com.ecocollecte.backend.repository;

import com.ecocollecte.backend.entity.Paiement;
import com.ecocollecte.backend.entity.StatutPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaiementRepository extends JpaRepository<Paiement, Long> {

    Optional<Paiement> findByCollecteId(Long collecteId);

    List<Paiement> findByStatut(StatutPaiement statut);
}