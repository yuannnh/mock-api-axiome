#!/bin/bash

mongorestore --host mongo:27017 --db "ApiAxiomeDB" --drop --collection "documents" "./ApiAxiomeDB/documents.bson"
mongorestore --host mongo:27017 --db "ApiAxiomeDB" --drop --collection "rankings" "./ApiAxiomeDB/rankings.bson"
