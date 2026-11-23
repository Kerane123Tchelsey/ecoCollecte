const API_URL = "http://localhost:8081/api";

export async function getClients() {
    const response = await fetch(`${API_URL}/clients`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les clients");
    }

    return await response.json();
}

export async function creerClient(client) {
    const response = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(client)
    });

    if (!response.ok) {
        throw new Error("Impossible d'enregistrer le client");
    }

    return await response.json();
}
