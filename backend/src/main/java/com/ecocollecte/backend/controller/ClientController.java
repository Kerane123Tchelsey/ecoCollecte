package com.ecocollecte.backend.controller;

import com.ecocollecte.backend.entity.Client;
import com.ecocollecte.backend.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {

    private final ClientService service;

    public ClientController(ClientService service) {
        this.service = service;
    }

    public record ClientResponse(
            Long id,
            String nom,
            String telephone,
            String email,
            String adresse
    ) {}

    private ClientResponse convertir(Client client) {
        return new ClientResponse(
                client.getId(),
                client.getNom(),
                client.getTelephone(),
                client.getEmail(),
                client.getAdresse()
        );
    }

    @PostMapping
    public ResponseEntity<ClientResponse> creer(@RequestBody Client client) {
        Client nouveauClient = service.enregistrer(client);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertir(nouveauClient));
    }

    @GetMapping
    public List<ClientResponse> lister() {
        return service.listerTous()
                .stream()
                .map(this::convertir)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> rechercher(@PathVariable Long id) {
        return service.rechercherParId(id)
                .map(client -> ResponseEntity.ok(convertir(client)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        service.supprimer(id);
        return ResponseEntity.noContent().build();
    }
}
