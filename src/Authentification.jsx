import { useState } from "react";
import { Leaf, Mail, Lock, User, Phone, ArrowRight, Recycle } from "lucide-react";

export default function Authentification({ onAuthenticated }) {
  const [mode, setMode] = useState("connexion");
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    role: "Utilisateur"
  });

  const inscription = mode === "inscription";

  const modifier = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const soumettre = (e) => {
    e.preventDefault();

    const utilisateur = {
      name: inscription ? form.nom : form.email.split("@")[0],
      email: form.email,
      phone: form.telephone,
    };

    localStorage.setItem("ec_user", JSON.stringify(utilisateur));
    localStorage.setItem("ec_role", form.role);

    onAuthenticated();
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo"><Leaf size={25} /></span>
          <span>Eco<span>Collecte</span></span>
        </div>

        <div className="auth-presentation">
          <span className="auth-badge">
            <Recycle size={15} /> POUR UNE VILLE PLUS PROPRE
          </span>

          <h1>Ensemble, construisons un environnement plus sain.</h1>

          <p>
            Simplifiez la collecte de vos déchets. Programmez vos collectes,
            suivez les interventions et participez à la propreté de votre quartier.
          </p>

          <div className="auth-benefits">
            <div><span>✓</span> Demandes de collecte simplifiées</div>
            <div><span>✓</span> Suivi de vos interventions</div>
            <div><span>✓</span> Service adapté à votre quartier</div>
          </div>
        </div>

        <div className="auth-footer">
          © 2026 EcoCollecte · Ville plus propre, vie meilleure
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-icon">
            <Leaf size={25} />
          </div>

          <span className="eyebrow">
            {inscription ? "REJOIGNEZ NOTRE COMMUNAUTÉ" : "BIENVENUE SUR ECOCOLLECTE"}
          </span>

          <h2>
            {inscription ? "Créer un compte" : "Heureux de vous revoir !"}
          </h2>

          <p className="auth-description">
            {inscription
              ? "Renseignez vos informations pour commencer."
              : "Connectez-vous pour accéder à votre espace."}
          </p>

          <div className="auth-tabs">
            <button
              className={!inscription ? "selected" : ""}
              onClick={() => setMode("connexion")}
              type="button"
            >
              Connexion
            </button>

            <button
              className={inscription ? "selected" : ""}
              onClick={() => setMode("inscription")}
              type="button"
            >
              Inscription
            </button>
          </div>

          <form onSubmit={soumettre}>
            {inscription && (
              <label className="auth-field">
                Nom complet
                <div>
                  <User size={17} />
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={modifier}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
              </label>
            )}

            <label className="auth-field">
              Adresse e-mail
              <div>
                <Mail size={17} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={modifier}
                  placeholder="exemple@email.com"
                  required
                />
              </div>
            </label>

            {inscription && (
              <label className="auth-field">
                Téléphone
                <div>
                  <Phone size={17} />
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={modifier}
                    placeholder="+237 6XX XXX XXX"
                    required
                  />
                </div>
              </label>
            )}

            <label className="auth-field">
              Mot de passe
              <div>
                <Lock size={17} />
                <input
                  type="password"
                  name="motDePasse"
                  value={form.motDePasse}
                  onChange={modifier}
                  placeholder="Votre mot de passe"
                  minLength="6"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              Type de compte
              <select name="role" value={form.role} onChange={modifier}>
                <option value="Utilisateur">Client</option>
                <option value="Éboueur">Agent de collecte</option>
                <option value="Gestionnaire">Gestionnaire</option>
              </select>
            </label>

            <button className="auth-submit" type="submit">
              {inscription ? "Créer mon compte" : "Se connecter"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-legal">
            En continuant, vous acceptez les conditions d'utilisation
            d'EcoCollecte.
          </p>
        </div>
      </div>
    </div>
  );
}