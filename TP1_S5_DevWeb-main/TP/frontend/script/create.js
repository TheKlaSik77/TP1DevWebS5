
document.getElementById('create-task-form').addEventListener('submit', function (event) {
  event.preventDefault();

  console.log('Formulaire soumis !');

  // Récupère les données du formulaire
  const formData = new FormData(event.target);
  const taskData = Object.fromEntries(formData.entries());

  for (const key in taskData) {
    if (taskData[key] === '') {
      delete taskData[key];
    }
  }

  // Envoie une requête POST pour créer une nouvelle tâche
  fetch(routes.create, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => ({ status: response.status, body: data }));
      }

      return { status: response.status, body: { "error": "Bad Request" } };
    })
    .then(res => {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = '';

      if (res.status === 201) {
        const task = res.body;
        resultContainer.innerHTML = `
                <h3>Tâche créée avec succès :</h3>
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
      console.error('Erreur lors de la création de la tâche:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la création de la tâche.</p>';
    });
});
