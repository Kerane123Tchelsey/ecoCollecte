package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Paiement;
import com.ecocollecte.backend.entity.StatutPaiement;
import com.ecocollecte.backend.service.PaiementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paiements")
@CrossOrigin(origins = "http://localhost:5173")
public class PaiementController {

    private final PaiementService service;

    public PaiementController(PaiementService service) {
        this.service = service;
    }

    @PostMapping
    public Paiement creer(@RequestBody Paiement paiement) {
        return service.enregistrer(paiement);
    }

    @GetMapping
    public List<Paiement> lister() {
        return service.listerTous();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paiement> rechercher(@PathVariable Long id) {
        return service.rechercherParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/collecte/{collecteId}")
    public ResponseEntity<Paiement> rechercherParCollecte(
            @PathVariable Long collecteId) {
        return service.rechercherParCollecte(collecteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statut/{statut}")
    public List<Paiement> listerParStatut(
            @PathVariable StatutPaiement statut) {
        return service.listerParStatut(statut);
    }
}