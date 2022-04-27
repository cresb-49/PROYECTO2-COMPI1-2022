%{
    //codigo insertado
%}

%lex
number [0-9]+       //Exprecion para la repecentacion de numeros
decimal {number}"." {number}
string (\"[^"]*\")
identificador ([a-zA-Z_$][a-zA-Z\\d_$]*)
%%

{number}        return 'ENTERO'
{decimal}       return 'DECIMAL'
{string}        return 'CADENA'


//Operadores Artimeticos

"*"             return '*'
"/"             return '/'
"%"             return '%'
"^"             return '^'
";"             return ';'
":"             return ':'
"."             return '.'
","             return ','
"++"            return '++'
"--"            return '--'
"-"             return '-'
"+"             return '+'

//Operadores Logicos
"<="            return '<='
">="            return '>='
"=="            return '=='
"!="            return '!='
"||"            return '||'
"|&"            return '|&'
"&&"            return '&&'
"!"             return '!'
"<"             return '<'
">"             return '>'
"="             return '='
"~"             return '~'

//Simbolos de Agrupacion
"("             return '('
")"             return ')'

//Palabras recervadas del lenguaje

"Double"        return 'DOUBLE'
"Boolean"       return 'BOOLEAN'
"String"        return 'STRING'
"Int"           return 'INT'
"Char"          return 'CHAR'
"Void"          return 'VOID'
"true"          return 'TRUE'
"false"         return 'FALSE'
"Principal"     return 'PRINCIPAL'
"Si"            return 'SI'
"Sino"          return 'SINO'
"Para"          return 'PARA'
"Mientras"      return 'MIENTRAS'
"Detener"       return 'DETENER'
"Continuar"     return 'CONTINUAR'
"Retorno"       return 'RETORNO'
"Mostrar"       return 'MOSTRAR'
"Importar"      return 'IMPORTAR'
"Incerteza"     return 'INCERTEZA'
"DibujarAST"    return 'DIBUJAR_AST'
"DibujarEXP"    return 'DIBUJAR_EXP'
"DibujarTS"     return 'DIBUJAR_TS'
".crl"          return 'EXTENCION_CRL'
{identificador} return 'ID'
<<EOF>>         return 'EOF'

/lex
%left   '!'
%left   '&&'
%left   '|&'
%left   '||'
%left   '==','!=','~'
%left   '<','>','<=','>='
%right  '^'
%left   '*','/','%'
%left   '+','-'

%start Init

%%

Init : inicioCode EOF;

inicioCode  :   listaImportacion defIncerteza instrucciones
            |   listaImportacion instrucciones
            |   defIncerteza instrucciones
            |   instrucciones
            ;

listaImportacion    :   listaImportacion importacion
                    |   importacion
                    ;

importacion :   IMPORTAR ID EXTENCION_CRL
            ;

defIncerteza    :   INCERTEZA DECIMAL
                ;

instrucciones   :   instrucciones instruction
                |   instruction
                ;

instruction     :   instructionGlobal
                |   instruccionFuncionMetodo
                |   VOID PRINCIPAL '(' ')' ':'
                |   error
                ;

instructionGlobal   :   instruccionDeclarar
                    |   instruccionAsignar
                    |   llamarFuncion
                    |   instruccionRetorno
                    |   sentenciaSi
                    |   sentenciaPara
                    |   sentenciaMientras
                    |   sentenciaDetener
                    |   sentenciaContinuar
                    |   funcionMostrar
                    |   funcionDibujarAST
                    |   funcionDibujarExp
                    |   funcionDibujarTs
                    ;

funcionDibujarTs    :   DIBUJAR_TS '('')'
                    ;

funcionDibujarExp   :   DIBUJAR_EXP '(' exprecion ')'
                    ;

funcionDibujarAST   :   DIBUJAR_AST '(' identificador ')'
                    ;

funcionMostrar  :   MOSTRAR '(' CADENA ',' parametrosEnviar ')'
                |   MOSTRAR '(' CADENA ')'
                ;

sentenciaContinuar  :   CONTINUAR
                    ;

sentenciaDetener    :   DETENER
                    ;

sentenciaMientras   :   MIENTRAS '(' exprecion ')' ':'
                    ;

sentenciaPara   :   PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'
                ;

opPara  :   '++'
        |   '--'
        ;

sentenciaSi :   SI '(' exprecion ')' ':'
            |   SINO ':'
            ;

instruccionRetorno  :   RETORNO exprecion
                    ;

llamarFuncion   :   ID '(' parametrosEnviar ')'
                ;

parametrosEnviar    :   parametrosEnviar ',' exprecion
                    |   exprecion
                    ;

instruccionFuncionMetodo    :   tipoDato ID '(' parametros ')' ':'
                            ;

parametros  :   parametros ',' tipoDato ID
            |   tipoDato ID 
            ;

instruccionAsignar  :   ID '=' exprecion
                    ;

instruccionDeclarar :   tipoDato listaIds '=' exprecion
                    ;
                
tipoDato    :   INT
            |   STRING
            |   CHAR
            |   DOUBLE
            |   BOOLEAN
            |   VOID
            ;

listaIds    :   listaIds ID
            |   ID
            ;

exprecion   :   DECIMAL
            |   ENTERO
            |   CADENA
            ;