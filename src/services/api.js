const API_URL = "http://192.168.88.79:8081/api";

async function envoyer(url, donnees) {
    const response = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees)
    });

    const resultat = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(resultat.message || "Une erreur est survenue.");
    }

    return resultat;
}

export function inscrireUtilisateur(donnees) {
    return envoyer("/auth/inscription", donnees);
}

export function connecterUtilisateur(donnees) {
    return envoyer("/auth/connexion", donnees);
}

export async function getClients() {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) throw new Error("Impossible de récupérer les clients");
    return response.json();
}

export async function creerClient(client) {
    return envoyer("/clients", client);
}