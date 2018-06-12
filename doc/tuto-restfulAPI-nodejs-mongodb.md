# Tutorial Restful API avec Node.js + MongoDB

## Introduction

Bonjour à tous, ce tutoriel explique comment réaliser un RESTful API rapidement avec Node.js et mongoDB chez Orange. Il couvre les parties suivant:

* Configuration de l'environnement
* Conception et architecture de l'api
* Utilisation de Node.js et mongoDB

Avant de commencer, on va regarder pourquoi Node.js + MongoDB:

1. Le format de données que le l'API fournit est JSON qui est nativement compatible avec Node.js.
2. Le API qu'on va faire ici est un mock, on veut que ce soit léger, fexible et facile à réaliser. 
    * Node.js, avec son module de routage, nous permet de faire un API léger sans passer par un fraework.
    * MongoDB est une base de données semi-structuré. C'est à dire que le structure de document est flexible mais il doit quand même respecter un structure pré-défini. [Pour en savoir plus].  Cela nous permet de modifier le structure de document un jour sans affecter ce qui est déjà dans la base.
   
Biensûr, Si c'est pour un API en prod, Php API-plateforme + MySQL est un très bon choix, car le framework est riche et complet, avec une performance fiable.
[Pour En savoir plus]:https://www.mongodb.com/compare/mongodb-mysql

## Configuration de l'environnement

#### Demander un VM linux
#### Configurer cntlm
Afin de utiliser npm pour gestion de dépendence, on veut que le VM a l'accès à internet.
* Configurer le fichier```/etc/cntlm.conf``` avec le bon cuid, le mot de passe hashé, et les url de proxy.   
* vérifier si cntlm est lancé:

    ```shell
    ps -ef | grep cntlm
    ```
    Sinon, deux façon pour lancer CNTLM:
    
    ```shell
    service cntlm start
    ```
    ou
    
    ```shell
    cntlm -v
    ```

* set variable d'environnent pour le utiliser le proxy configuré
    La plus part des applications quand il ont besoind de accéder à internet, il regarde si variables d'environnement de proxy existent, si oui, ils les utilisent.
    
    ```shell
    export $http_proxy=127.0.0.1:3128
    export $https_proxy=127.0.0.1:3128
    ```
    **Note:** Vous pouvez aussi configurer cette variable en permanance en mettant ces command dans le fichier ```etc/profile``` ou ``` /home/<user>/.bash_profile```.

* vérifier si l'internet marche:

    ```shell
    wget www.google.fr
    ```
    **Note:** Ne utilisez pas ping pour tester l'accès à l'internet car ping ne utilise pas protocol http.


#### Installer Node.js

Il y a plusieurs de façon pour installer node.js. [Pour les voir]    
Je vous conseille ici de installer node via Node version Manager (nvm), il est décrit dans le lien ci-dessus.
[Pour les voir]: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server
**Note:** chaque fois quand on relance le VM, il faut refaire ```nvm use [version de node]``` Sinon votre session ne connait pas le command npm


#### Installer mongoDB

* Télécharger et installer mongoDB depuis son [site officiel] en suivant le tutoriel
[site officiel]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/

* Si mongod n'est pas lancé automatiquement, lancez-le:

    ```shell
    service mongod start
    ```
*  vérifer s'il est bien lancé et écoute à 127.0.0.1:27017
    
    ```shell
    netstat -vatn
    ```

Un petit check list pour vous aider à vérifier tous les étape dessus.

* Est-ce VM a bien l'accès à l'internet?
* Est-ce que les deux variable d'environnement existent bien?
* Est-ce que node marche bien ```node --version```?
* Est-ce que mongod tourne bien sur la porte 27017 ?
    
Si la vérification pour chaque étape passe, vous avez un environnement bien prêt à construire votre API.



## Conception et architecture de l'API

Pour commencer, on va d'abord regarder l'arbre de chemin de notre application. On ne liste ici que les élément éssentiel pour l'application. Les autres fichiers que vous pouvez voir dans le git est pour la partie DevOps. On va le parler dans un doc séparement. 

├── api/    {+ tous les logique de api sont dedans +}     
├── node_modules/    {+ les dépendences +}     
├── package.json     {+ fichier config de application avec les descriptions des dépendance +}       
├── package-lock.json    {+ fichier config non-configurable +}      
├── README.md       
└── server.js     {+ script qui gère tous les fonctionnalité basique d'une application web. Y compri l'envoie et la récepetion de requête, communication avec la base de données et ouverture d'une socket pour écouter. +}      


Maintenant on va regarder ce qui est dans le répertoire ```api/``` qui contient les logique de notre API.

.                
├── <b>controllers</b>              
│   ├── documentController.js                   
│   └── rankingController.js        
├── <b>models</b>                
│   ├── documentModel.js                      
│   └── rankingModel.js                  
└── <b>routes</b>                
    └── route.js                         
    
Le logique de' API est réparti à trois rôles:

* controller
    Pour mettre en place les logique, enregistrer récupérer les données dans la base. 
* model
    Pour décrire le structure des données.
* router
    prendre les requête entré et les dispatcher à la bonne méthode dans le controller.

Pour ce mock d'API, on a deux type de document stocké dans la base, document et ranking. Chacun possède son propre controller et model. Le route est assez léger, on a donc les intégré dans un seul fichier route.js


## Utilisation de Node.js et MongoDB

Pour Ne pas perdre le temps, vous pouvez clone le code source dans ce répertoire. biensûr, vous pouvez le commencer de tout début. 

###### commencer de tout début:

1. créer un répertoire de projet
2. initialiser un node projet, et suivre le processus de npm

```shell
npm init
```
3. installer les dépendances:

```shell
npm install --save express json-loader json-parser mongoose nodemon
```
4. créer les fichier et les répertoire mentionner ci-dessus.

###### commencer par clone les codes

```shell
git clone [url de projet]
```

dans la répertoire de projet

```shell
npm install
```
Cela vous permet de installer tous les  dépendances qu'on a besoin.

#### Les dépendances

* <b> express </b>  express est un module pour gérer l'envoie et la réception des requête http facilement.
* <b> mongoose </b>  mongoose établit le lien avec mongoDB, il nous permet de manipuler la base de données avec javascript

#### Les models

MongoDB ne demande pas que les documents entrés soient de même structure. Cela présente la flexibilité du mongoDB.
Par contre Mongoose ajoute une couche au dessus de mongoDB, il nous permet de prédéfinir le model du document. Grâce à ce model, il vérifie si le document à entrer dans la base correspond bien à la sturcture.
Les model ici est pour définir le model de document. Voir la [signature d'API] pour connaître le model qu'on a besoin.
[signature d'API]: https://api-designer.sso.infra.ftgroup/swagger-ui/?url=https://api-designer.sso.infra.ftgroup/api/1.0/apis/ae8GQeMGjw/swagger.json#/

Ici on prend que document comme un exemple.
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocSchema = new Schema({
  id: {
    type: String,
    required: 'Document id is required. type: String'
  },
  name: {
    type: String,
    required: 'Document name is required. type: String'
  },
  keywords: [String],
  language:{
    type: String,
    enum: ['francais FR', 'anglais EN', 'espagnol ES', 'polonais PL'],
    default: 'francais FR'
  },
  type: {
    type: String,
    enum: ['file', 'video'],
    default: 'file'
  },
  lastModificationDate:{
    type: Date,
    default: Date.now
  },
  lastModificationAuthor:{
    type: String,
    required: 'lastModificationAuthor is required. type: String'
  },
  diffusion: {
    type: String,
    enum: ['internal', 'external'],
    default: 'internal'
  },
  attachment: {
    type: AttachmentSchema,
    required:'attachment information is required. type: AttachementSchema'
  },
  environment: {
    type: String,
    enum: ['France', 'International', 'Operateur'],
    default: 'France'
  },
  icon: IconSchema,
  ranking: {
    type: [String],
    enum: ['SalesAids', 'FieldsOfActivity'],
    default: ['SalesAids']
  }

});

module.exports = mongoose.model('Document', DocSchema);

```

On définit ici ce qu'on appelle le schema de notre model, chaque élément est définit au moins par son type. Si c'est au choix, on peut très bien utiliser enum pour lister les différents choix.
On peut aussi créer nos propre type qui est défint par un schéma aussi, voir le [source code] pour plus de détails
[source code]:https://gitlab.forge.orange-labs.fr/axcb/api-node/blob/master/api/models/documentModel.js

#### Les controllers

On prend aussi l' exemple pour documentController

On veut que api puisse:
* lister tous les document pour /documents
* lister les documents correspond quand on ajoute les parametres. Par exemple: /documents?name=xxx
* lister les documents correspond quand on lui donne un liste de mot clé.

```javascript
exports.list_docs = function(req, res) {
  if (req.query.keywords){
    find_doc_by_keywords(req, res);
  } else {
    find_doc_by_attr(req,res);
  }

};

find_doc_by_keywords = function(req, res) {
  var keywords = req.query.keywords.split(",");
  console.log(keywords);
  Document.find({keywords:{$all:keywords}}, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};


find_doc_by_attr = function(req, res) {
  Document.find(req.query, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};

```
La permière méthode nous permet de distinguer si client veut chercher les documents par attribut ou mot clés, parce que le méthode pour chercher dans la base est différent.
Les deux fonction suivant présente la recherche de documents par les info founit dans la requête http.

Pour les autres fonctionnalités, je ne entre pas dans la détails ici. voir le [source code] pour les savoir
[source code]:https://gitlab.forge.orange-labs.fr/axcb/api-node/blob/master/api/controllers/documentController.js



#### Les routes

Grâce au module express, la partie route est tout simple.
Prenons toujours le document comme un exemple:

/api/routes/route.js

```javascript
  app.route('/documents')
    .get(documentController.list_docs)
    .post(documentController.create_a_doc)

```
On peut donner le chemin à app et lui dire quelle méthode à utiliser dans le controller pour les différent type de requête http.
**Note:** Lecode ci-dessus n'est que pour présenter le logique, il est pas complet.





