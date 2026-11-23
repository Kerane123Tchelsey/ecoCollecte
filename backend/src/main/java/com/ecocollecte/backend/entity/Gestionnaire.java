package com.ecocollecte.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "gestionnaires")
public class Gestionnaire extends Utilisateur {

    public Gestionnaire() {
        super();
    }

    public Gestionnaire(String nom, String telephone,
                        String email, String motDePasse) {

        super(nom, telephone, email, motDePasse);
    }
}