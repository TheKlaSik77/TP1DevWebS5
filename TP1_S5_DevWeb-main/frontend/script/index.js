
const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];
let offset = 0;
const limit = 10;

function fetchProducts() {
  fetch(routes.index.replace('{offset}', offset).replace('{limit}', limit))
    .then(response => response.json())
    .then(data => {
      populateTable(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des produits:', error));
}

function populateTable(products) {
  productsTable.innerHTML = '';
  products.forEach(product => {
    const row = productsTable.insertRow();
    row.insertCell(0).textContent = product.id_produit;
    row.insertCell(1).textContent = product.nom;
    row.insertCell(2).textContent = product.description;
    row.insertCell(3).textContent = product.categorie;
    row.insertCell(4).textContent = product.prix;
    row.insertCell(5).textContent = product.date_creation;
  });
}

function changePage(direction) {
  offset = Math.max(0, offset + direction * limit);
  fetchProducts();
}

document.addEventListener('DOMContentLoaded', fetchProducts);
