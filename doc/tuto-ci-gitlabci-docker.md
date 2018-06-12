# Tutoriel Intégration continue avec GitLab-ci et Docker

## Introduction
Au sein de la DSI Orange aujourd'hui, on utilise de plus en plus Gitlab-ci pour réaliser réaliser l'intégration continue. Même si ce n'est pas encore utilisé par les Ops pour prod, c'est performe bien jusqu'à la qualif.
Ce tuto est pour vous montrer l'intégration continue avec Gitlab-ci et docker en prenant notre petit mock d'api comme un exemple.     

Gitlab-ci est intégré dans gitlab. Il fait tourner les containers Docker sur les Runners(les machines) derrières, puis lancer l'application dans le runner. 
Dans le container, on peut effectuer l'intégration, test ou déployement. Ils sont décrit dans un fichier qui s'appelle .gitlab-ci.

## Les besoins
Voici quelques chose on veut réaliser par gitlab-ci:

* lancer un container de la base de donnée.
* restore la base
* lancer un container de l'application
* installer les dépendances
* faire communiquer les deux container

## Réalisation

Cette partie vous explique comment réaliser les besoins qu'on a lister ci-dessus. le scirpt complet [.gitlab-ci.yml]     
[.gitlab-ci.yml]: https://gitlab.forge.orange-labs.fr/axcb/api-node/blob/master/.gitlab-ci.yml

#### Services
On définit un service avec une image docker et son alias. Un container docker va se lancer à partir de l'image indiqué, il est accessible par son alias.
On lance souvent une base de donnée comme un service. Dans notre exemple mongoDB est lancé comme un service, et on peut y accéder à la base par mongo:27017.

```ymal
services:
  - name: dockerproxy-iva.si.francetelecom.fr/mongo:latest
    alias: mongo

```
[Pour savoir plus sur service]
[Pour savoir plus sur service]:https://docs.gitlab.com/ee/ci/services/README.html

#### Jobs
Jobs est pour définir une tâche à effectuer dans un container docker. un job est définit au moins par 
* une image docker(on peut aussi définit une image globalement, dans ce cas la, tous les job utiliseront par défaut cette image)
* tags (ce la est pour pointer vers un runner ou on lance notre container)   

En suite on peut ajouter les choses à exécuter dans le container.    
      
Dans notre cas, pour effecuter restore de la base, on lance un container mongo à partir de image mongo, puis exécuter des command pour restore les donnée dans le service qu'on a définit au début.    
Attention, on a deux container de mongo ici. l'un est un service qui est notre base de donnée. l'autre n'est que pour exécuter les command de restore. Il se fermera quand le job est terminé.
      
Avec tags, un bon runner peut être trouvé. ici, c'est un runnner qui a accès à l'internet, cela servira npm install dans le deuxième job. Pour connaître les différent [runners]
[runner]:http://devops-store.rd.francetelecom.fr/dos?page_id=6538

```ymal
restore:
  stage: restore
  image: dockerproxy-iva.si.francetelecom.fr/mongo:latest
  tags: 
    - docker
    - devopsstore
    - docker-privileged
    - devwatt
    - shared
    - rsc

  script:
    - mongorestore --host mongo:27017 --db "ApiAxiomeDB" --drop --collection "documents" "./ApiAxiomeDB/documents.bson"
    - mongorestore --host mongo:27017 --db "ApiAxiomeDB" --drop --collection "rankings" "./ApiAxiomeDB/rankings.bson"

```

#### Stage

Stage est définit avant tous les jobs. cela permet de grouper jobs. Les jobs taggé par le même stage est éxecuté parallèlement. 
[Pour en savoir plus]
[Pour en savoir plus]:https://docs.gitlab.com/ee/ci/yaml/#stage

## Surveillance

Si un porjet de gitlab possède un fichier .gitlab-ci.yml, ce script s'éxecute chaque fois quand il y a un nouveau commit. on peut regarder le résultat de l'exécution en cliquant sur le bouton CI/CD dans la colonne à gauche de l'IHM Gitlab.



