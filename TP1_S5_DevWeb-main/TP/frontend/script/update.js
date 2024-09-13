
document.getElementById('findTaskToUpdateButton').addEventListener('click', function () {
  const taskId = document.getElementById('taskIdToUpdate').value;
  if (!taskId) {
    alert('Veuillez entrer un ID de tâche.');
    return;
  }

  fetch(routes.findOne.replace('{taskId}', taskId))
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(res => {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = '';

      if (res.status === 200) {
        const task = res.body;
        document.getElementById('nom').value = task.nom;
        document.getElementById('description').value = task.description;
        document.getElementById('statut').value = task.statut;
        document.getElementById('categorie').value = task.categorie;
        document.getElementById('priorite').value = task.priorite;
        document.getElementById('utilisateur').value = task.utilisateur;
        document.getElementById('extraField').value = task.extraField || '';

        // Afficher le formulaire de mise à jour
        document.getElementById('update-task-form').style.display = 'block';
      } else {
        resultContainer.innerHTML = `
                    <h3>Erreur :</h3>
                    <p>Code: ${res.status}</p>
                    <p>Message: ${res.body.erreur}</p>
                `;
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la tâche:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la recherche de la tâche.</p>';
    });
});

document.getElementById('update-task-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const taskId = document.getElementById('taskIdToUpdate').value;
  const formData = new FormData(event.target);
  const taskData = Object.fromEntries(formData.entries());

  fetch(routes.update.replace('{taskId}', taskId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(res => {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = '';

      if (res.status === 200) {
        const task = res.body;
        resultContainer.innerHTML = `
                <h3>Tâche mise à jour avec succès :</h3>
                <p>ID: ${task.id_tache}</p>
                <p>Nom: ${task.nom}</p>
                <p>Description: ${task.description}</p>
                <p>Statut: ${task.statut}</p>
                <p>Catégorie: ${task.categorie}</p>
                <p>Priorité: ${task.priorite}</p>
                <p>Utilisateur: ${task.utilisateur}</p>
                <p>Date de mise à jour: ${task.updated_at}</p>
            `;
      } else {
        resultContainer.innerHTML = `
                <h3>Erreur :</h3>
                <p>Code: ${res.status}</p>
                <p>Message: ${res.body.erreur}</p>
            `;
      }
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la mise à jour de la tâche.</p>';
    });
});
