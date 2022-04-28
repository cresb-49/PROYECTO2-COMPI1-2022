%{
    //codigo insertado
    const {StringBuilder} = require('./../Strings/StringBuilder');
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
{string}            return 'CADENA'
{identacion}        return 'IDENTACION'
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

Init    : inicioCode EOF {console.log("Inicio del analisi");}
        ;

inicioCode  :   listaImportacion defIncerteza instrucciones
            |   listaImportacion instrucciones
            |   defIncerteza instrucciones
            |   instrucciones
            ;

listaImportacion    :   listaImportacion importacion    {console.log("lsita importacion");}
                    |   importacion                     {console.log("importacion");}
                    ;

importacion :   IMPORTAR ID EXTENCION_CRL
            ;

defIncerteza    :   INCERTEZA DECIMAL   {console.log("inserteza");}
                ;

instrucciones   :   instrucciones instruction
                |   instruction
                ;

instruction     :   instructionGlobal
                |   instruccionFuncionMetodo
                |   VOID PRINCIPAL '(' ')' ':'  {console.log("void principal");}
                |   error   {console.log("Errores del analisis");}
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

funcionMostrar  :   IDENTACION MOSTRAR '(' CADENA ',' parametrosEnviar ')'  {console.log("identacion mostrar");}
                |   IDENTACION MOSTRAR '(' CADENA ')'   {console.log("identacion mostrar");}
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


exprecion   :   exprecion '+' exprecion     {console.log("+");}
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
    |   CADENA                      {console.log("cadena");}
    |   ID                          {console.log("identificador");}
    |   ID '(' ')'                  {console.log("funcion vacia");}
    |   ID '(' parametrosEnviar ')' {console.log("funcion parametros");}
    ;