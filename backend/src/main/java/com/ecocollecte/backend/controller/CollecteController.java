package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Collecte;
import com.ecocollecte.backend.entity.StatutCollecte;
import com.ecocollecte.backend.service.CollecteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collectes")
@CrossOrigin(origins = "http://localhost:5173")
public class CollecteController {

    private final CollecteService service;

    public CollecteController(CollecteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Collecte> creer(@RequestBody Collecte collecte) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.enregistrer(collecte));
    }

    @GetMapping
    public List<Collecte> lister() {
        return service.listerToutes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Collecte> rechercher(@PathVariable Long id) {
        return service.rechercherParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public List<Collecte> listerParClient(@PathVariable Long clientId) {
        return service.listerParClient(clientId);
    }

    @GetMapping("/statut/{statut}")
    public List<Collecte> listerParStatut(@PathVariable StatutCollecte statut) {
        return service.listerParStatut(statut);
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<Collecte> modifierStatut(
            @PathVariable Long id,
            @RequestParam StatutCollecte statut) {

        return service.rechercherParId(id).map(collecte -> {
            collecte.setStatut(statut);
            return ResponseEntity.ok(service.enregistrer(collecte));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        service.supprimer(id);
        return ResponseEntity.noContent().build();
    }
}