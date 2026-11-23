package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Gestionnaire;
import com.ecocollecte.backend.repository.GestionnaireRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class GestionnaireService {

    private final GestionnaireRepository repository;

    public GestionnaireService(GestionnaireRepository repository) {
        this.repository = repository;
    }

    public Gestionnaire enregistrer(Gestionnaire gestionnaire) {
        return repository.save(gestionnaire);
    }

    public List<Gestionnaire> listerTous() {
        return repository.findAll();
    }

    public Optional<Gestionnaire> rechercherParId(Long id) {
        return repository.findById(id);
    }

    public Optional<Gestionnaire> rechercherParEmail(String email) {
        return repository.findByEmail(email);
    }

    public void supprimer(Long id) {
        repository.deleteById(id);
    }
}