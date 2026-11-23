package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Eboueur;
import com.ecocollecte.backend.service.EboueurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eboueurs")
@CrossOrigin(origins = "http://localhost:5173")
public class EboueurController {

    private final EboueurService service;

    public EboueurController(EboueurService service) {
        this.service = service;
    }

    @PostMapping
    public Eboueur creer(@RequestBody Eboueur eboueur) {
        return service.enregistrer(eboueur);
    }

    @GetMapping
    public List<Eboueur> lister() {
        return service.listerTous();
    }

    @GetMapping("/disponibles")
    public List<Eboueur> listerDisponibles() {
        return service.listerDisponibles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eboueur> rechercher(@PathVariable Long id) {
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