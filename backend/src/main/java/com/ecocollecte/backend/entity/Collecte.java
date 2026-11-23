package com.ecocollecte.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "collectes")
public class Collecte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateSouhaitee;

    private String adresse;

    private String position;

    @Enumerated(EnumType.STRING)
    private TypeCollecte type;

    @Enumerated(EnumType.STRING)
    private StatutCollecte statut = StatutCollecte.EN_ATTENTE;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    public Collecte() {
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateSouhaitee() {
        return dateSouhaitee;
    }

    public void setDateSouhaitee(LocalDateTime dateSouhaitee) {
        this.dateSouhaitee = dateSouhaitee;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public TypeCollecte getType() {
        return type;
    }

    public void setType(TypeCollecte type) {
        this.type = type;
    }

    public StatutCollecte getStatut() {
        return statut;
    }

    public void setStatut(StatutCollecte statut) {
        this.statut = statut;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}