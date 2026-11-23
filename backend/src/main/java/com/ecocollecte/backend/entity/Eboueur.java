package com.ecocollecte.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "eboueurs")
public class Eboueur extends Utilisateur {

    private boolean disponible = true;

    public Eboueur() {
        super();
    }

    public Eboueur(String nom, String telephone,
                   String email, String motDePasse,
                   boolean disponible) {

        super(nom, telephone, email, motDePasse);
        this.disponible = disponible;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }
}