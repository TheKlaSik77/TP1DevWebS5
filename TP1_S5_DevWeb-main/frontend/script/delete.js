
document.getElementById('deleteProductButton').addEventListener('click', function () {
  const taskId = document.getElementById('taskIdToDelete').value;
  if (!taskId) {
    alert('Veuillez entrer un ID de produit.');
    return;
  }

  fetch(routes.delete.replace('{taskId}', taskId), {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status === 204) {
        return { status: response.status, statusText: response.statusText }
      }

      return response.json()
    })
    .then(res => {
      const deleteResultContainer = document.getElementById('resultContainer');
      deleteResultContainer.innerHTML = '';

      deleteResultContainer.innerHTML = `
      <h3>Réponse :</h3>
      <p>Code: ${res.status}</p>
      <p>Message: ${res?.statusText}</p>
      <p>Erreur: ${res.body?.erreur ?? "aucune"}</p>`;
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du produit:', error);
      document.getElementById('resultContainer').innerHTML = '<p>Une erreur est survenue lors de la suppression du produit. Ca n\'est pas bon :( </p>';
    });
});
