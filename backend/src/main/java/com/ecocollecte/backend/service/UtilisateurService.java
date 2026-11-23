package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Utilisateur;
import com.ecocollecte.backend.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public List<Utilisateur> listerTous() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> rechercherParId(Long id) {
        return utilisateurRepository.findById(id);
    }

    public Optional<Utilisateur> rechercherParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public void supprimer(Long id) {
        utilisateurRepository.deleteById(id);
    }
}