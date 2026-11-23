package com.ecocollecte.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "paiements")
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant;

    private LocalDateTime datePaiement;

    @Enumerated(EnumType.STRING)
    private ModePaiement mode;

    @Enumerated(EnumType.STRING)
    private StatutPaiement statut = StatutPaiement.EN_ATTENTE;

    @OneToOne
    @JoinColumn(name = "collecte_id", nullable = false, unique = true)
    private Collecte collecte;

    public Paiement() {
    }

    @PrePersist
    public void definirDatePaiement() {
        if (datePaiement == null) {
            datePaiement = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public LocalDateTime getDatePaiement() {
        return datePaiement;
    }

    public ModePaiement getMode() {
        return mode;
    }

    public void setMode(ModePaiement mode) {
        this.mode = mode;
    }

    public StatutPaiement getStatut() {
        return statut;
    }

    public void setStatut(StatutPaiement statut) {
        this.statut = statut;
    }

    public Collecte getCollecte() {
        return collecte;
    }

    public void setCollecte(Collecte collecte) {
        this.collecte = collecte;
    }
}