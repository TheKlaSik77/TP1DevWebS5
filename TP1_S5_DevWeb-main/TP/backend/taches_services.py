
from grand_dataset_taches import base_de_donnees_taches,next_id
from datetime import datetime
from uuid import uuid4

# Pas de Flask dans le service

def update_tache(id,body):

    tache = base_de_donnees_taches.get(id)
    
    tache['date_creation'] = datetime.now()
    tache.update(body)
    return tache
