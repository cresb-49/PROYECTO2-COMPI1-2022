%{
    //codigo insertado
    const {StringBuilder} = require('../StringBuilder');
    let RESULT_STRING_LEC = new StringBuilder();
%}


%lex
number [0-9]+       //Exprecion para la repecentacion de numeros
decimal {number}"." {number}
string (\"[^"]*\")
identacion ([\t]+)
space ([ ])
identificador ([a-zA-Z_$][a-zA-Z\\d_$]*)


%s  INITIAL STRING_STATE
%%

\s+                 {/* skip whitespace */}
([\t]+[\n])         {/* skip whitespace */}
[\n]                {/* skip whitespace */}

{number}            return 'ENTERO';
{decimal}           return 'DECIMAL';
//{string}        return 'CADENA'
{identacion}                return 'IDENTACION'
space
["]                         %{ this.begin('STRING_STATE'); %}
<STRING_STATE>(\")          %{ 
                                yytext = RESULT_STRING_LEC.toString();
                                this.popState();
                                return 'CADENA';
                            %}
<STRING_STATE>[^\n\r\"\\]+  %{ 
                                RESULT_STRING_LEC.appedend(yytext);
                            %}
<STRING_STATE>(\\t)         %{ 
                                RESULT_STRING_LEC.append('\t');
                            %}
<STRING_STATE>(\\n)         %{ 
                                RESULT_STRING_LEC.append('\n');
                            %}
<STRING_STATE>(\\r)         %{
                                RESULT_STRING_LEC.append('\r');
                            %}
<STRING_STATE>(\\\")        %{ 
                                RESULT_STRING_LEC.append('\"');
                            %}
<STRING_STATE>(\\)          %{
                                RESULT_STRING_LEC.append('\\');
                            %}

//Extencion de archivo

".crl"          return 'EXTENCION_CRL'

//Operadores Artimeticos

"*"             return '*'
"/"             return '/'
"%"             return '%'
"^"             return '^'
";"             return ';'
":"             return ':'
//"."             return '.'
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

funcionDibujarTs    :   IDENTACION DIBUJAR_TS '('')'
                    ;

funcionDibujarExp   :   IDENTACION DIBUJAR_EXP '(' exprecion ')'
                    ;

funcionDibujarAST   :   IDENTACION DIBUJAR_AST '(' identificador ')'
                    ;

funcionMostrar  :   IDENTACION MOSTRAR '(' CADENA ',' parametrosEnviar ')'
                |   IDENTACION MOSTRAR '(' CADENA ')'
                ;

sentenciaContinuar  :   IDENTACION CONTINUAR
                    ;

sentenciaDetener    :   IDENTACION DETENER
                    ;

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'
                ;

opPara  :   '++'
        |   '--'
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':'
            |   IDENTACION SINO ':'
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion
                    ;

llamarFuncion   :   IDENTACION ID '(' parametrosEnviar ')'
                |   IDENTACION ID '(' ')'
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
                    |   IDENTACION ID '=' exprecion
                    ;

instruccionDeclarar :   IDENTACION tipoDato listaIds
                    ;
                
tipoDato    :   INT
            |   STRING
            |   CHAR
            |   DOUBLE
            |   BOOLEAN
            |   VOID
            ;

listaIds    :   listaIds ',' ID
            |   listaIds ',' ID '=' exprecion
            |   ID
            |   ID '=' exprecion
            ;


exprecion   :   exprecion '+' exprecion
            |   exprecion '-' exprecion
            |   exprecion '/' exprecion
            |   exprecion '^' exprecion
            |   exprecion '*' exprecion
            |   exprecion '%' exprecion
            |   exprecion '>' exprecion
            |   exprecion '<' exprecion
            |   exprecion '>=' exprecion
            |   exprecion '<=' exprecion
            |   exprecion '!=' exprecion
            |   exprecion '||' exprecion
            |   exprecion '|&' exprecion
            |   exprecion '&&' exprecion
            |   exprecion '~' exprecion
            |   '!' exprecion
            |   f
            ;

f   :   '(' exprecion ')'
    |   DECIMAL
    |   ENTERO
    |   CADENA
    |   ID
    |   ID '(' ')'
    |   ID '(' parametrosEnviar ')'
    ;