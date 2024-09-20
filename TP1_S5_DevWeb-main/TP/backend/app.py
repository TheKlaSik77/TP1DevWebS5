from flask import Flask, request
from flask_cors import CORS
from taches_bp import tache_bp
app = Flask(__name__)

CORS(app, resources={
    r"/*" : {
        "origins" : ["*"],
        "methods" : ["GET","POST","PUT","DELETE","OPTIONS"]
    }
})

app.register_blueprint(tache_bp,url_prefix="/taches")