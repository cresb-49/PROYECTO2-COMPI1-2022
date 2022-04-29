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

    function agregarTipoDeclaracion(tipo,elementos,identacion){
        console.log('Tipo: '+tipo);
        console.log('Identacion: '+identacion.length);
        console.log('Elementos: '+elementos);
    }
    
%}


%lex

identificador ([a-zA-Z_$]([a-zA-Z_$]|[0-9])*)

%%

\t+                 {
                        console.log('Identacion');
                        return 'IDENTACION';
                    }
\n                  {
                        console.log('Salto de linea');
                    }
\s                  {
                        /*ingnorado*/
                    }
[0-9]+              {return 'ENTERO';}
[0-9]+"."[0-9]+     {return 'DECIMAL';}
(\"[^"]*\")         {return 'CADENA';}
".crl"              {return 'EXTENCION_CRL';}



"*"             {return '*';}
"/"             {return '/';}
"%"             {return '%';}
"^"             {return '^';}
";"             {return ';';}
":"             {return ':';}
","             {return ',';}
"++"            {return '++';}
"--"            {return '--';}
"-"             {return '-';}
"+"             {return '+';}

"<="            {return '<=';}
">="            {return '>=';}
"=="            {return '==';}
"!="            {return '!=';}
"||"            {return '||';}
"|&"            {return '|&';}
"&&"            {return '&&';}
"!"             {return '!';}
"<"             {return '<';}
">"             {return '>';}
"="             {return '=';}
"~"             {return '~';}

"("             {return '(';}
")"             {return ')';}

"Double"        {return 'DOUBLE';}
"Boolean"       {return 'BOOLEAN';}
"String"        {return 'STRING';}
"Int"           {return 'INT';}
"Char"          {return 'CHAR';}
"Void"          {return 'VOID';}
"true"          {return 'TRUE';}
"false"         {return 'FALSE';}
"Si"            {return 'SI';}
"Sino"          {return 'SINO';}
"Para"          {return 'PARA';}
"Mientras"      {return 'MIENTRAS';}
"Detener"       {return 'DETENER';}
"Continuar"     {return 'CONTINUAR';}
"Retorno"       {return 'RETORNO';}
"Mostrar"       {return 'MOSTRAR';}
"Importar"      {return 'IMPORTAR';}
"Incerteza"     {return 'INCERTEZA';}
"DibujarAST"    {return 'DIBUJAR_AST';}
"DibujarEXP"    {return 'DIBUJAR_EXP';}
"DibujarTS"     {return 'DIBUJAR_TS';}
"Principal"     {return 'PRINCIPAL';}
{identificador} {return 'ID';}
<<EOF>>         {return 'EOF';}

.               {console.log('Se encontro un error lexico:'+ yytext);}

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

instruccionDeclarar :   IDENTACION tipoDato listaIds    {agregarTipoDeclaracion($2,$3,$1)}
                    |   tipoDato listaIds               {agregarTipoDeclaracion($1,$2,"")}
                    ;
                
tipoDato    :   INT         {$$=$1;}
            |   STRING      {$$=$1;}
            |   CHAR        {$$=$1;}
            |   DOUBLE      {$$=$1;}
            |   BOOLEAN     {$$=$1;}
            |   VOID        {$$=$1;}
            ;

listaIds    :   listaIds ',' ID                 {
                                                    $1.push(new Declaracion($3,null,@3.first_line,@3.first_column));
                                                    $$ = $1;
                                                }
            |   listaIds ',' ID '=' exprecion   {
                                                    $1.push(new Declaracion($3,$5,@3.first_line,@3.first_column));
                                                    $$ = $1;
                                                }
            |   ID                              {
                                                    $$ = [new Declaracion($1,null,@1.first_line,@1.first_column)];
                                                }
            |   ID '=' exprecion                {
                                                    $$ = [new Declaracion($1,$3,@1.first_line,@1.first_column)];
                                                }
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