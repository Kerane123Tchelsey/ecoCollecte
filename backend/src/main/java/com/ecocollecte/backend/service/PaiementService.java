package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Paiement;
import com.ecocollecte.backend.entity.StatutPaiement;
import com.ecocollecte.backend.repository.PaiementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaiementService {

    private final PaiementRepository repository;

    public PaiementService(PaiementRepository repository) {
        this.repository = repository;
    }

    public Paiement enregistrer(Paiement paiement) {
        return repository.save(paiement);
    }

    public List<Paiement> listerTous() {
        return repository.findAll();
    }

    public Optional<Paiement> rechercherParId(Long id) {
        return repository.findById(id);
    }

    public Optional<Paiement> rechercherParCollecte(Long collecteId) {
        return repository.findByCollecteId(collecteId);
    }

    public List<Paiement> listerParStatut(StatutPaiement statut) {
        return repository.findByStatut(statut);
    }

    public void supprimer(Long id) {
        repository.deleteById(id);
    }
}