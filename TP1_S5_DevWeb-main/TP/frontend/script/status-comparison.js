let comparisonChart = null;

function fetchAndRenderChart() {
  fetch(routes.comparison)
    .then(response => response.json())
    .then(data => {
      const labels = ["En attente", "En cours", "Terminées"]

      const values = {
        [labels[0]]: data[labels[0]] ?? 0,
        [labels[1]]: data[labels[1]] ?? 0,
        [labels[2]]: data[labels[2]] ?? 0
      }

      const ctx = document.getElementById('comparisonChart').getContext('2d');
      if (comparisonChart) {
        comparisonChart.destroy();
      }

      comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            label: 'Tâches',
            backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
            borderColor: ['#0056b3', '#1e7e34', '#c82333', '#e0a800'],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Comparaison des tâches par statut'
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

fetchAndRenderChart();
