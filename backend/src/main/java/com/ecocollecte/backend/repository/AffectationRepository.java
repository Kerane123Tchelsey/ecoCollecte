package com.ecocollecte.backend.repository;

import com.ecocollecte.backend.entity.Affectation;
import com.ecocollecte.backend.entity.Eboueur;
import com.ecocollecte.backend.entity.Collecte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AffectationRepository extends JpaRepository<Affectation, Long> {

    Optional<Affectation> findByCollecte(Collecte collecte);

    List<Affectation> findByEboueur(Eboueur eboueur);
}