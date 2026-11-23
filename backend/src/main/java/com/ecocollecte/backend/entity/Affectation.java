package com.ecocollecte.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "affectations")
public class Affectation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateAffectation;

    @OneToOne
    @JoinColumn(name = "collecte_id", nullable = false, unique = true)
    private Collecte collecte;

    @ManyToOne
    @JoinColumn(name = "eboueur_id", nullable = false)
    private Eboueur eboueur;

    @ManyToOne
    @JoinColumn(name = "gestionnaire_id", nullable = false)
    private Gestionnaire gestionnaire;

    public Affectation() {
    }

    @PrePersist
    public void definirDateAffectation() {
        if (dateAffectation == null) {
            dateAffectation = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateAffectation() {
        return dateAffectation;
    }

    public Collecte getCollecte() {
        return collecte;
    }

    public void setCollecte(Collecte collecte) {
        this.collecte = collecte;
    }

    public Eboueur getEboueur() {
        return eboueur;
    }

    public void setEboueur(Eboueur eboueur) {
        this.eboueur = eboueur;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public void setGestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
    }
}