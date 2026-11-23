package com.ecocollecte.backend.repository;

import com.ecocollecte.backend.entity.Eboueur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EboueurRepository extends JpaRepository<Eboueur, Long> {

    Optional<Eboueur> findByEmail(String email);

    List<Eboueur> findByDisponible(boolean disponible);
}