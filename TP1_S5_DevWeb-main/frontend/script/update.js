
document.getElementById('findTaskToUpdateButton').addEventListener('click', function () {
  const taskId = document.getElementById('taskIdToUpdate').value;
  if (!taskId) {
    alert('Veuillez entrer un ID de produit.');
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
        document.getElementById('categorie').value = task.categorie;
        document.getElementById('prix').value = task.prix;
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
      console.error('Erreur lors de la récupération du produit:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la recherche du produit.</p>';
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
        const produit = res.body;
        resultContainer.innerHTML = `
                <h3>Produit mis à jour avec succès :</h3>
                <p>ID: ${produit.id_produit}</p>
                <p>Nom: ${produit.nom}</p>
                <p>Description: ${produit.description}</p>
                <p>Catégorie: ${produit.categorie}</p>
                <p>Prix: ${produit.prix}</p>
                <p>Date de création: ${produit.date_creation}</p>
                <p>Date de mise à jour: ${produit.date_maj}</p>
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
      console.error('Erreur lors de la mise à jour du produit:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la mise à jour du produit.</p>';
    });
});
