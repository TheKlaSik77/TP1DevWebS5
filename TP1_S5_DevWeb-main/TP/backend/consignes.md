# Consignes pour le TP Flask : API de Gestion de Tâches

## Objectifs

Votre objectif est de développer une API avec Flask qui permette de gérer une liste de tâches (Todo List) via les différentes opérations CRUD (Create, Read, Update, Delete). Vous allez également mettre en place des statistiques sur ces tâches.

## Prérequis

1. L'application doit être développée en utilisant Flask.
2. Toutes les requêtes doivent pouvoir être effectuées depuis le frontend fourni (fichiers HTML et JavaScript).
3. Vous devez autoriser toutes les applications à se connecter et permettre les méthodes **GET / POST / PUT / DELETE et OPTIONS**.

## Tâches à Implémenter

### 1. **Lancer l'Application**

- L'application doit se lancer sans erreur.
- Le serveur doit écouter sur `http://localhost:5000`.

### 2. **Routes à Implémenter**

Pour chaque endpoint, vous devez vous baser sur les définitions fournies dans le fichier `routes.js`.

#### a. **Liste de toutes les tâches** ()

- **Format de retour attendu** : Une liste de tâches contenant des dictionnaires `[{tache1}, {tache2}, ...]`
- **Pagination** : La pagination doit être gérée à l'aide de deux paramètres de requête : `offset` et `limit`.
  - **Exemple** : `/tasks?offset=0&limit=10` doit retourner les 10 premières tâches.
  - **Remarque** : `offset` et `limit` doivent être convertis en nombre entier avant utilisation.

#### b. **Trouver une tâche par ID** ()

- **Format de retour attendu** : Un dictionnaire contenant les propriétés de la tâche.
- **Gestion des erreurs** : Si la tâche n'est pas trouvée, retourner une réponse avec le code HTTP approprié et un message d'erreur sous le format `{"error": "Tâche non trouvée"}`.

#### c. **Créer une nouvelle tâche** ()

- **Format de retour attendu** : La nouvelle tâche créée avec ses attributs (y compris `id` et `date de création`).
- **Gestion de l'ID et de la date de création** :
  - L'ID (`id_tache`) et la date de création (`date_creation`) doivent être gérés par le backend.
  - Une variable globale `next_id` est fournie pour gérer l'attribution des IDs. Pensez à utiliser le mot-clé `global` pour manipuler cette variable.
  - Vous pouvez générer la date de création avec datetime.now par exemple.
- **Validation** : La validation des inputs doit être faite côté backend.

#### d. **Modifier une tâche existante** ()

- **Format de retour attendu** : La tâche modifiée sous forme de dictionnaire.
- **Validation** : La validation des inputs doit être faite côté backend.
- **Gestion des erreurs** :
  - Si la tâche n'est pas trouvée, retourner une réponse avec le code HTTP approprié et un message d'erreur sous le format `{"error": "Tâche non trouvée"}`.

#### e. **Supprimer une tâche** ()

- **Comportement attendu** : Supprimer la tâche si elle existe et renvoyer une réponse indiquant l'absence de contenu.
- **Gestion des erreurs** : L'appli ne doit pas planter si on essaie de supprimer une tâche qui n'existe pas.

#### f. **Statistiques sur les tâches** ()

- **Format de retour attendu** : Un dictionnaire avec le nombre de tâches par statut.
  - 3 status existent pour l'application = 'TODO', 'IN_PROGRESS', 'DONE'
  - **Exemple de retour** :
  ```json
  {
    "En attente": 1002,
    "En cours": 102,
    "Terminées": 1500
  }
  ```

### 3. **Contours du projet**

#### a. **Documentation**

Veillez à laisser à disposition les informations nécessaires pour installer le projet

- dépendances à installer
- procédure d'installation du projet

#### b. **Code**

Vous pouvez coder en français ou en anglais, mais restez cohérents sur vos choix
Attention aux fichiers/dossiers que vous versionnez, certains n'ont pas vocation à quitter votre PC

#### c. **GPT & co**

Merci de ne pas l'utiliser pour ce projet, il n'y a pas de complexité qui nécessite son utilisation
Vous avez en revanche droit de consulter la doc Python, Flask, StackOverflow ...
