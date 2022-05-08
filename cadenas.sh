#! /bin/bash
echo "EJECUTANDO JISON"
jison ANALIZADOR-DE-CODIGO/CADENAS/cadenas.jison

echo "COPIANDO ARCHIVOS"
mv cadenas.js CRL-EDITOR/src/app/logicCode/Grammar