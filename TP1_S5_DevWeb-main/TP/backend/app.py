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