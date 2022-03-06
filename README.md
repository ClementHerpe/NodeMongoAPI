# Une REST API simple

## MongoDB / NodejJS / Heroku

Ce projet permet toutes les actions CRUD avec un objet simple : des livres.

### Structure :
Un livre possèdé un titre, un genre et un auteur
un auteur possède un nom et un age

### Routes :
**READ** La route principale est https://pacific-journey-42353.herokuapp.com/api/books, qui permet de récupérer tous les livres de la DB en GET

**READ2**Pour lire les infos d'un livre donné : https://pacific-journey-42353.herokuapp.com/api/books/ID (ex : /6224e48d664434a4a6e62127) en GET

**CREATE** Pour en ajouter, même route en post, paramètres attendus en POST : 

{
    "bookName": "Lorem ipsum",
    "authorName": "JohnDoe",
    "authorAge": "42",
    "gender": "Lorem" 
}

**EDIT** Pour modifier un livre : https://pacific-journey-42353.herokuapp.com/api/books/ID (ex : /6224e48d664434a4a6e62127) en PUT

{
    "bookName": "Lorem ipsum",
    "authorName": "JohnDoe",
    "authorAge": "42",
    "gender": "Lorem" 
}

**DELETE** Pour supprimer un livre : https://pacific-journey-42353.herokuapp.com/api/books/ID (ex : /6224e48d664434a4a6e62127) en DELETE

### Outils :

**Mongoose** pour faciliter les opérations sur la BDD MongoDB
**Express** évidemment
**Winston** pour logger les erreurs
**Yup** pour vérifier le format des données envoyées

### Evolution :

Restreindre l'accès