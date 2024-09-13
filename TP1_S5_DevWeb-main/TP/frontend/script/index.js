
const tasksTable = document.getElementById('tasks-table').getElementsByTagName('tbody')[0];
let offset = 0;
const limit = 10;

function fetchTasks() {
  fetch(routes.index.replace('{offset}', offset).replace('{limit}', limit))
    .then(response => response.json())
    .then(data => {
      populateTable(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des tâches:', error));
}

function populateTable(tasks) {
  tasksTable.innerHTML = '';
  tasks.forEach(task => {
    const row = tasksTable.insertRow();
    row.insertCell(0).textContent = task.id_tache;
    row.insertCell(1).textContent = task.nom;
    row.insertCell(2).textContent = task.description;
    row.insertCell(3).textContent = task.statut;
    row.insertCell(4).textContent = task.categorie;
    row.insertCell(5).textContent = task.priorite;
    row.insertCell(6).textContent = task.utilisateur;
    row.insertCell(7).textContent = task.date_creation;
  });
}

function changePage(direction) {
  offset = Math.max(0, offset + direction * limit);
  fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);
