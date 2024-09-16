from flask import Flask, request
from flask_cors import CORS
from grand_dataset_taches import base_de_donnees_taches,next_id
from datetime import datetime

app = Flask(__name__)

CORS(app, resources={
    r"/*" : {
        "origins" : ["*"],
        "methods" : ["GET","POST","PUT","DELETE","OPTIONS"]
    }
})

@app.get('/')
def hello():
    return {"message" : "Hello"}

@app.get('/tache/<string:id>')
def find_one(id):
    tache = base_de_donnees_taches.get(id)

    # Si produit n'existe pas, on crée un objet erreur. On ne renvoie pas juste "erreur"
    if tache is None:
        return {"error" : "Tache non trouvee"},404
    return tache


@app.post('/tache') 
def create():
    body = request.json
    global next_id
    id = next_id
    tache = {
        "categorie": body['categorie'],
        "date_creation": datetime.now(),
        "description": body['description'],
        "id_tache": id,
        "nom": body['nom'],
        "priorite": body['priorite'],
        "statut": body['statut'],
        "utilisateur": body['utilisateur']
    }
    base_de_donnees_taches[id] = tache
    return tache

# Exemple de body :
"""
{
  "categorie" : "test categorie",
  "description" : "test description",
  "nom" : "test nom",
  "priorite" : "test priorité",
  "statut" : "test statut",
  "utilisateur" : "test utilisateur"
}
"""


@app.get('/taches') #/taches?offset=10&limit=10
def find_many():
    offset = request.args.get('offset',0)
    limit = request.args.get('limit',10)

    int_offset = int(offset)
    int_limit = int(limit)
    return list(base_de_donnees_taches.values())[int_offset: int_offset+int_limit]


@app.delete('/tache/<string:id>')
def delete_one(id):
    base_de_donnees_taches.pop(id,None)

    return {},204


@app.get('/stats')
def get_stats():

    nb_todo = 0
    nb_in_progress = 0
    nb_done = 0
    nb_autres = 0
    
    for tache in base_de_donnees_taches.values():
        if tache['statut'] == 'TODO':
            nb_todo += 1
        elif tache['statut'] == 'IN_PROGRESS':
            nb_in_progress += 1
        elif tache['statut'] == 'DONE':
            nb_done += 1
        else :
            nb_autres += 1

    return {
        "nombre de taches a faire" : nb_todo,
        "nombre de taches en cours" : nb_in_progress,
        "nombre de taches terminees" : nb_done,
        "nombre de taches inconnues" : nb_autres
    }

"""
#### d. **Modifier une tâche existante** ()

- **Format de retour attendu** : La tâche modifiée sous forme de dictionnaire.
- **Validation** : La validation des inputs doit être faite côté backend.
- **Gestion des erreurs** :
  - Si la tâche n'est pas trouvée, retourner une réponse avec le code HTTP approprié et un message d'erreur sous le format `{"error": "Tâche non trouvée"}`.
"""

@app.patch('/tache/<string:id>')
def update_tache(id):

    tache = base_de_donnees_taches.get(id)
    
    if tache is None:
        return {"error" : "Tache non trouvee"},404

    body = request.json
    if 'categorie' in body:
        tache['categorie'] = body['categorie']
    if 'description' in body:
        tache['description'] = body['description']
    if 'priorite' in body:
        tache['priorite'] = body['priorite']
    if 'statut' in body:
        tache['statut'] = body['statut']
    if 'utilisateur' in body:
        tache['utlisateur'] = body['utilisateur']

    return tache


"""
Patch -> http://127.0.0.1:5000/tache/10000
{
  "nom" : "tache update",
  "statut" : "DONE",
  "utilisateur" : "Kylian"
}
"""