package com.ecocollecte.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "clients")
public class Client extends Utilisateur {

    private String adresse;

    public Client() {
        super();
    }

    public Client(String nom, String telephone, String email,
                  String motDePasse, String adresse) {

        super(nom, telephone, email, motDePasse);
        this.adresse = adresse;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
}