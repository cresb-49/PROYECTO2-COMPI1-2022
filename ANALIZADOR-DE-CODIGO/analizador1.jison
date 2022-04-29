%{
    //codigo insertado
    const {StringBuilder} = require('./../Strings/StringBuilder');
    const {Declaracion} = require('./../Instrucciones/Declaracion.ts');
    const {Funcion} = require('./../Instrucciones/Funcion.ts');
    const {Mientras} = require('./../Instrucciones/Mientras.ts');
    const {Mostrar} = require('./../Instrucciones/Mostrar.ts');
    const {Retornar} = require('./../Instrucciones/Retornar.ts');
    const {Sentencias} = require('./../Instrucciones/Sentencias.ts');
    const {Para} = require('./../Instrucciones/Para.ts');
    const {Si} = require('./../Instrucciones/Si.ts');
    //const {ConsolaCRLComponent} = require('./../../consola-crl/consola-crl.component.ts');

    let INCERTEZA_GLOBAL = 0.5;
    let RESULT_STRING_LEC = new StringBuilder();
    let INSTRUCCIONES_RECUPERADAS=[];


    function errorAnalisisCodigo(element,er){
        console.log("Error sintactico: "+er+" en la liena: "+element._$.first_line+" ,en la columna: "+(element._$.first_column+1)+" ,Esperados: ");
    }
%}


%lex
number [0-9]+       //Exprecion para la repecentacion de numeros
decimal {number}"."{number}
string (\"[^"]*\")
//identacion (([\t]+)|(\s\s\s\s\s)+)
identacion ([\t]+)
space ([ ])
identificador ([a-zA-Z_$]([a-zA-Z_$]|[0-9])*)


//%s  INITIAL STRING_STATE
%%

{identacion}        {return 'IDENTACION';}
\s+                 {/* skip whitespace */}
([\t]+[\n])         {/* skip whitespace */}
[\n]                {/* skip whitespace */}

{decimal}           return 'DECIMAL';
{number}            return 'ENTERO';
{string}            return 'CADENA'

// ["]                         %{ this.begin('STRING_STATE'); %}
// <STRING_STATE>[^\n\r\"\\]+  %{ 
//                                 RESULT_STRING_LEC.appedend(yytext);
//                             %}
// <STRING_STATE>(\\t)         %{ 
//                                 RESULT_STRING_LEC.append('\t');
//                             %}
// <STRING_STATE>(\\n)         %{ 
//                                 RESULT_STRING_LEC.append('\n');
//                             %}
// <STRING_STATE>(\\r)         %{
//                                 RESULT_STRING_LEC.append('\r');
//                             %}
// <STRING_STATE>(\\\")        %{ 
//                                 RESULT_STRING_LEC.append('\"');
//                             %}
// <STRING_STATE>(\\)          %{
//                                 RESULT_STRING_LEC.append('\\');
//                             %}
// <STRING_STATE>(\")          %{ 
//                                 yytext = RESULT_STRING_LEC.toString();
//                                 this.popState();
//                                 return 'CADENA';
//                             %}
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
"Principal"     return 'PRINCIPAL'
{identificador} return 'ID'
<<EOF>>         return 'EOF'

.               {console.log('Se encontro un error lexico');}

/lex

//menos precedencia
%left   '!'
%left   '&&'
%left   '|&'
%left   '||'
%left   '==','!=','~'
%left   '<','>','<=','>='
%right  '^'
%left   '*','/','%'
%left   '+','-'
//mas precendecia 
%start Init

%%

Init    : inicioCode EOF    {
                                console.log("Inicio del analisi");
                                return INSTRUCCIONES_RECUPERADAS;
                            }
        ;

inicioCode  :   listaImportacion defIncerteza instrucciones
            |   listaImportacion instrucciones
            |   defIncerteza instrucciones
            |   instrucciones
            ;

listaImportacion    :   listaImportacion importacion
                    |   importacion
                    ;

importacion :   IMPORTAR ID EXTENCION_CRL   {console.log($1 + "Archivo: "+$2);}
            ;

defIncerteza    :   INCERTEZA DECIMAL   {
                                            console.log("incerteza: "+$2);
                                            INCERTEZA_GLOBAL = Number($2);
                                            console.log("Incerteza global: "+INCERTEZA_GLOBAL);
                                        }
                ;

instrucciones   :   instrucciones instruction
                |   instruction
                ;

instruction     :   instructionGlobal
                |   instruccionFuncionMetodo
                |   VOID PRINCIPAL '(' ')' ':'  {console.log("void principal");}
                |   error   {errorAnalisisCodigo(this,$1);}
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

funcionDibujarTs    :   IDENTACION DIBUJAR_TS '('')'    {console.log("identacion TS");}
                    ;

funcionDibujarExp   :   IDENTACION DIBUJAR_EXP '(' exprecion ')'    {console.log("identacion EXP");}
                    ;

funcionDibujarAST   :   IDENTACION DIBUJAR_AST '(' identificador ')'    {console.log("identacion AST");}
                    ;

funcionMostrar  :   IDENTACION MOSTRAR '(' exprecion ',' parametrosEnviar ')'   {
                                                                                    //console.log("identacion mostrar");
                                                                                    $$ = new Mostrar($4,[],@2.first_line,@2.first_column);
                                                                                    INSTRUCCIONES_RECUPERADAS.push($$);
                                                                                }
                |   IDENTACION MOSTRAR '(' exprecion ')'    {
                                                                //console.log("identacion mostrar");
                                                                $$ = new Mostrar($4,[],@2.first_line,@2.first_column);
                                                                INSTRUCCIONES_RECUPERADAS.push($$);
                                                            }
                ;

sentenciaContinuar  :   IDENTACION CONTINUAR    {console.log("continuar");}
                    ;

sentenciaDetener    :   IDENTACION DETENER  {console.log("detener");}
                    ;

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'   {console.log("identacion mientras");}
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'    {console.log("identacion para");}
                ;

opPara  :   '++'
        |   '--'
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':' {console.log("identacion sentencias si");}
            |   IDENTACION SINO ':'                 {console.log("identacion sentencia sino");}
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion    {console.log("retorno");}
                    ;

llamarFuncion   :   IDENTACION ID '(' parametrosEnviar ')'  {console.log("identacion funcion parametros");}
                |   IDENTACION ID '(' ')'   {console.log("identacion funcion");}
                ;

parametrosEnviar    :   parametrosEnviar ',' exprecion
                    |   exprecion
                    ;

instruccionFuncionMetodo    :   tipoDato ID '(' parametros ')' ':'  {console.log("declaracion metodo parametros");}
                            |   tipoDato ID '(' ')' ':'  {console.log("declaracion metodo vacio");}
                            ;

parametros  :   parametros ',' tipoDato ID
            |   tipoDato ID 
            ;

instruccionAsignar  :   ID '=' exprecion                {console.log("asignacion");}
                    |   IDENTACION ID '=' exprecion     {console.log("identacion asignar");}
                    ;

instruccionDeclarar :   IDENTACION tipoDato listaIds    {console.log("identacion declarar");}
                    |   tipoDato listaIds               {console.log("declarar");}
                    ;
                
tipoDato    :   INT         {console.log("int");}
            |   STRING      {console.log("string");}
            |   CHAR        {console.log("char");}
            |   DOUBLE      {console.log("double");}
            |   BOOLEAN     {console.log("bool");}
            |   VOID        {console.log("void");}
            ;

listaIds    :   listaIds ',' ID                 {console.log("list , var");}
            |   listaIds ',' ID '=' exprecion   {console.log("list , asig var");}
            |   ID                              {console.log("var");}
            |   ID '=' exprecion                {console.log("asig var");}
            ;


exprecion   :   exprecion '+' exprecion     {}
            |   exprecion '-' exprecion     {console.log("-");}
            |   exprecion '/' exprecion     {console.log("/");}
            |   exprecion '^' exprecion     {console.log("^");}
            |   exprecion '*' exprecion     {console.log("*");}
            |   exprecion '%' exprecion     {console.log("%");}
            |   exprecion '>' exprecion     {console.log(">");}
            |   exprecion '<' exprecion     {console.log("<");}
            |   exprecion '>=' exprecion    {console.log(">=");}
            |   exprecion '<=' exprecion    {console.log("<=");}
            |   exprecion '!=' exprecion    {console.log("!=");}
            |   exprecion '||' exprecion    {console.log("||");}
            |   exprecion '|&' exprecion    {console.log("|&");}
            |   exprecion '&&' exprecion    {console.log("&&");}
            |   exprecion '~' exprecion     {console.log("~");}
            |   '!' exprecion               {console.log("!");}
            |   f                           {console.log("f");}
            ;

f   :   '(' exprecion ')'           {console.log("exprecion entre parentecis");}
    |   DECIMAL                     {console.log("decimal");}
    |   ENTERO                      {console.log("entero");}
    |   CADENA                      {console.log("cadena");console.log($1);}
    |   TRUE
    |   FALSE
    |   ID                          {console.log("identificador");}
    |   ID '(' ')'                  {console.log("funcion vacia");}
    |   ID '(' parametrosEnviar ')' {console.log("funcion parametros");}
    ;