package com.ecocollecte.backend.repository;

import com.ecocollecte.backend.entity.Gestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long> {

    Optional<Gestionnaire> findByEmail(String email);

    boolean existsByEmail(String email);
}