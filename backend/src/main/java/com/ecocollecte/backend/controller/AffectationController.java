package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Affectation;
import com.ecocollecte.backend.entity.Gestionnaire;
import com.ecocollecte.backend.service.AffectationService;
import com.ecocollecte.backend.service.GestionnaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affectations")
@CrossOrigin(origins = "http://localhost:5173")
public class AffectationController {

    private final AffectationService service;
    private final GestionnaireService gestionnaireService;

    public AffectationController(
            AffectationService service,
            GestionnaireService gestionnaireService) {
        this.service = service;
        this.gestionnaireService = gestionnaireService;
    }

    @PostMapping
    public ResponseEntity<Affectation> affecter(
            @RequestParam Long collecteId,
            @RequestParam Long eboueurId,
            @RequestParam Long gestionnaireId) {

        Gestionnaire gestionnaire = gestionnaireService
                .rechercherParId(gestionnaireId)
                .orElseThrow(() -> new RuntimeException("Gestionnaire introuvable"));

        Affectation affectation = service.affecter(
                collecteId, eboueurId, gestionnaire);

        return ResponseEntity.ok(affectation);
    }

    @GetMapping
    public List<Affectation> lister() {
        return service.listerToutes();
    }

    @GetMapping("/eboueur/{eboueurId}")
    public List<Affectation> missionsEboueur(@PathVariable Long eboueurId) {
        return service.listerMissionsEboueur(eboueurId);
    }
}