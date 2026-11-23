package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Gestionnaire;
import com.ecocollecte.backend.service.GestionnaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gestionnaires")
@CrossOrigin(origins = "http://localhost:5173")
public class GestionnaireController {

    private final GestionnaireService service;

    public GestionnaireController(GestionnaireService service) {
        this.service = service;
    }

    @PostMapping
    public Gestionnaire creer(@RequestBody Gestionnaire gestionnaire) {
        return service.enregistrer(gestionnaire);
    }

    @GetMapping
    public List<Gestionnaire> lister() {
        return service.listerTous();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gestionnaire> rechercher(@PathVariable Long id) {
        return service.rechercherParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        service.supprimer(id);
        return ResponseEntity.noContent().build();
    }
}