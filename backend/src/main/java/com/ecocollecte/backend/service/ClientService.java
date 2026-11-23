package com.ecocollecte.backend.service;

import com.ecocollecte.backend.entity.Client;
import com.ecocollecte.backend.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client enregistrer(Client client) {
        return clientRepository.save(client);
    }

    public List<Client> listerTous() {
        return clientRepository.findAll();
    }

    public Optional<Client> rechercherParId(Long id) {
        return clientRepository.findById(id);
    }

    public Optional<Client> rechercherParEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public void supprimer(Long id) {
        clientRepository.deleteById(id);
    }
}