
document.getElementById('findTaskButton').addEventListener('click', function () {
  const taskId = document.getElementById('taskId').value;
  if (!taskId) {
    alert('Veuillez entrer un ID de tâche.');
    return;
  }

  fetch(routes.findOne.replace('{taskId}', taskId))
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(res => {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = ''; // Clear previous result

      if (res.status === 200) {
        const task = res.body;
        resultContainer.innerHTML = `
                    <h3>Tâche trouvée :</h3>
                    <p>ID: ${task.id_tache}</p>
                    <p>Nom: ${task.nom}</p>
                    <p>Description: ${task.description}</p>
                    <p>Statut: ${task.statut}</p>
                    <p>Catégorie: ${task.categorie}</p>
                    <p>Priorité: ${task.priorite}</p>
                    <p>Utilisateur: ${task.utilisateur}</p>
                    <p>Date de création: ${task.date_creation}</p>
                `;
      } else {
        resultContainer.innerHTML = `
                    <h3>Erreur :</h3>
                    <p>Code: ${res.status}</p>
                    <p>Message: ${res.body.error}</p>
                `;
      }
    })
    .catch(error => {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = ''; // Clear previous result
      resultContainer.innerHTML = `
                <h3>Erreur :</h3>
                <p>Message: ${error}</p>
            `;
    });
});
