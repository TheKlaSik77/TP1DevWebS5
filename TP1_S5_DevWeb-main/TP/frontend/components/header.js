
const headerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="find-one.html">Trouver un produit</a></li>
                <li><a href="create.html">Créer un produit</a></li>
                <li><a href="update.html">Mettre à jour un produit</a></li>
                <li><a href="delete.html">Supprimer un produit</a></li>
                <li><a href="comparison.html">Comparaison des catégories</a></li>   
            </ul>
        </nav>
    `;
document.getElementsByTagName('header')[0].innerHTML = headerHTML;
