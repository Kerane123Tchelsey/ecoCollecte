package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Collecte;
import com.ecocollecte.backend.entity.StatutCollecte;
import com.ecocollecte.backend.repository.CollecteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollecteService {

    private final CollecteRepository repository;

    public CollecteService(CollecteRepository repository) {
        this.repository = repository;
    }

    public Collecte enregistrer(Collecte collecte) {
        return repository.save(collecte);
    }

    public List<Collecte> listerToutes() {
        return repository.findAll();
    }

    public Optional<Collecte> rechercherParId(Long id) {
        return repository.findById(id);
    }

    public List<Collecte> listerParClient(Long clientId) {
        return repository.findByClientIdOrderByDateSouhaiteeDesc(clientId);
    }

    public List<Collecte> listerParStatut(StatutCollecte statut) {
        return repository.findByStatut(statut);
    }

    public void supprimer(Long id) {
        repository.deleteById(id);
    }
}