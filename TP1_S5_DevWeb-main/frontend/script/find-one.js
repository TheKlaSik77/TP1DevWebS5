
document.getElementById('findProductButton').addEventListener('click', function () {
  const taskId = document.getElementById('taskId').value;
  if (!taskId) {
    alert('Veuillez entrer un ID de produit.');
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
                    <h3>Produit trouvé:</h3>
                    <p>ID: ${task.id_produit}</p>
                    <p>Nom: ${task.nom}</p>
                    <p>Description: ${task.description}</p>
                    <p>Catégorie: ${task.categorie}</p>
                    <p>Prix: ${task.prix}</p>
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
