#!/bin/bash

mongodump -v --host mongo:27017 --db "ApiAxiomeDB" --out .