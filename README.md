# EcoCollecte — application mobile PWA

Cette application est une première version mobile (Android + Web mobile) de l’application de collecte des ordures. Elle est développée avec React et Vite sous forme de PWA installable.

## 1. Prérequis
- Installer Node.js (version LTS) : https://nodejs.org/
- Installer Visual Studio Code.

## 2. Ouvrir le projet
1. Décompresser `collecte-ordures-pwa.zip`.
2. Ouvrir le dossier `collecte-ordures-pwa` dans VS Code.
3. Ouvrir le terminal intégré : Terminal > Nouveau terminal.

## 3. Installer et démarrer
Dans le terminal, exécuter successivement :

```bash
npm install
npm run dev
```

Vite affiche une adresse locale, généralement `http://localhost:5173`. Ouvrir cette adresse dans le navigateur.

Pour vérifier la version de production :
```bash
npm run build
npm run preview
```

## 4. Installer sur Android
1. Démarrer le projet et le rendre accessible sur le téléphone (même réseau local, ou déploiement HTTPS).
2. Ouvrir l’adresse du site dans Chrome sur Android.
3. Appuyer sur le menu ⋮ puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».
4. L’application s’ouvre ensuite dans une fenêtre autonome.

Une PWA doit être servie en HTTPS pour l’installation sur un téléphone distant (localhost est une exception pour le développement).

## 5. Fonctionnalités présentes
- Interface responsive pour téléphone, tablette et ordinateur.
- Trois modes de démonstration : Utilisateur, Éboueur, Gestionnaire.
- Création de demandes de collecte planifiée ou express.
- Choix de zone, adresse, date et créneau.
- Affichage des tarifs indicatifs.
- Liste, recherche, suivi et historique des demandes.
- Mise à jour du statut par le mode Éboueur/Gestionnaire.
- Gestion de démonstration des éboueurs, camions, zones et tarifs.
- Signalement d’incident.
- Profil et notifications.
- Manifest PWA et service worker pour la mise en cache de base.

## 6. Important : périmètre de cette version
Cette livraison est un prototype frontend autonome. Les données sont stockées dans le `localStorage` du navigateur : elles restent sur le même appareil et le même navigateur. Les comptes, l’authentification réelle, la synchronisation entre utilisateurs, la géolocalisation GPS, les notifications push et le paiement Mobile Money ne sont pas encore connectés à un serveur.

Pour la version finale du projet, il faudra relier cette interface à un backend commun (API) et à une base de données. Il faudra également intégrer un prestataire de paiement réel et sécuriser les accès selon les rôles. Les noms de zones et les prix sont des exemples de démonstration à valider.
