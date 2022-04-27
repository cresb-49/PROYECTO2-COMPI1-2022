#! /bin/bash
echo "EJECUTANDO JISON"
jison ANALIZADOR-DE-CODIGO/analizador1.jison

echo "COPIANDO ARCHIVOS"
cp analizador1.js ANALIZADOR-DE-CODIGO
mv analizador1.js CRL-EDITOR/src/app/logicCode/Grammar