package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.*;
import com.ecocollecte.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AffectationService {

    private final AffectationRepository affectationRepository;
    private final CollecteRepository collecteRepository;
    private final EboueurRepository eboueurRepository;

    public AffectationService(
            AffectationRepository affectationRepository,
            CollecteRepository collecteRepository,
            EboueurRepository eboueurRepository) {
        this.affectationRepository = affectationRepository;
        this.collecteRepository = collecteRepository;
        this.eboueurRepository = eboueurRepository;
    }

    @Transactional
    public Affectation affecter(Long collecteId, Long eboueurId,
                                Gestionnaire gestionnaire) {

        Collecte collecte = collecteRepository.findById(collecteId)
                .orElseThrow(() -> new RuntimeException("Collecte introuvable"));

        Eboueur eboueur = eboueurRepository.findById(eboueurId)
                .orElseThrow(() -> new RuntimeException("Eboueur introuvable"));

        if (!eboueur.isDisponible()) {
            throw new RuntimeException("Cet éboueur n'est pas disponible");
        }

        if (affectationRepository.findByCollecte(collecte).isPresent()) {
            throw new RuntimeException("Cette collecte est déjà affectée");
        }

        if (collecte.getStatut() != StatutCollecte.VALIDEE) {
            throw new RuntimeException("La collecte doit être validée avant son affectation");
        }

        Affectation affectation = new Affectation();
        affectation.setCollecte(collecte);
        affectation.setEboueur(eboueur);
        affectation.setGestionnaire(gestionnaire);

        collecte.setStatut(StatutCollecte.AFFECTEE);
        eboueur.setDisponible(false);

        collecteRepository.save(collecte);
        eboueurRepository.save(eboueur);

        return affectationRepository.save(affectation);
    }

    public List<Affectation> listerToutes() {
        return affectationRepository.findAll();
    }

    public List<Affectation> listerMissionsEboueur(Long eboueurId) {
        Eboueur eboueur = eboueurRepository.findById(eboueurId)
                .orElseThrow(() -> new RuntimeException("Eboueur introuvable"));

        return affectationRepository.findByEboueur(eboueur);
    }

    public Optional<Affectation> rechercherParId(Long id) {
        return affectationRepository.findById(id);
    }
}