tache_dto = {
    "type":"object",
    "properties" : {
        "categorie" : {"type" : "string"},
        "description" : {"type" : "string"},
        "nom" : {"type" : "string"},
        "priorite" : {"type" : "int"},
        "statut" : {"type" : "string","enum" : ["TODO","IN_PROGRESS","DONE"]},
        "utilisateur" : {"type" : "string"}

    },
    "required" : ["nom","description","prix","categorie"],
    "additionalProperties" : False
}

patch_tache_dto = {
    **tache_dto,
    "required" : []
}