
const headerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="find-one.html">Trouver une tâche</a></li>
                <li><a href="create.html">Créer une tâche</a></li>
                <li><a href="update.html">Mettre à jour une tâche</a></li>
                <li><a href="delete.html">Supprimer une tâche</a></li>
                <li><a href="status-comparison.html">Comparaison des statuts</a></li>   
            </ul>
        </nav>
    `;
document.getElementsByTagName('header')[0].innerHTML = headerHTML;
