package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Eboueur;
import com.ecocollecte.backend.repository.EboueurRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EboueurService {

    private final EboueurRepository repository;

    public EboueurService(EboueurRepository repository) {
        this.repository = repository;
    }

    public Eboueur enregistrer(Eboueur eboueur) {
        return repository.save(eboueur);
    }

    public List<Eboueur> listerTous() {
        return repository.findAll();
    }

    public List<Eboueur> listerDisponibles() {
        return repository.findByDisponible(true);
    }

    public Optional<Eboueur> rechercherParId(Long id) {
        return repository.findById(id);
    }

    public void supprimer(Long id) {
        repository.deleteById(id);
    }
}