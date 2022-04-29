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
    const {Sino} = require('./../Instrucciones/Sino.ts');
    const {Asignacion} = require('./../Instrucciones/Asignacion.ts');
    const {Detener} = require('./../Instrucciones/Detener.ts');
    const {Continuar} = require('./../Instrucciones/Continuar.ts');

    const {Acceder} = require ('./../Expresion/Acceder.ts')
    const {Literal} = require ('./../Expresion/Literal.ts')
    const {Logica} = require ('./../Expresion/Logica.ts')
    const {Operacion} = require ('./../Expresion/Operacion.ts')
    const {Relacional} = require ('./../Expresion/Relacional.ts')




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

    function agregarScope2(identacion,instr){
        console.log("Identacion agregar: "+identacion.length);
        console.log("Instraccion: "+instr);
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

sentenciaContinuar  :   IDENTACION CONTINUAR    {$$ = new Continuar(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaDetener    :   IDENTACION DETENER  {$$ = new Detener(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'   {$$ = new Mientras($4,null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'    {$$ = new Para($5,$7.$9,$11,null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                ;

opPara  :   '++'    {$$ = 0;}
        |   '--'    {$$ = 1;}
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':' {$$ = new Si($4,null,null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            |   IDENTACION SINO ':'                 {$$ = new Sino(null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion    {$$ = new Retorno($3,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
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

instruccionAsignar  :   ID '=' exprecion                {$$ = new Asignacion($1,$3,@1.first_line,(@1.first_column+1));agregarScope2("",$$);}
                    |   IDENTACION ID '=' exprecion     {$$ = new Asignacion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}}
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
                                                    $1.push(new Declaracion($3,null,@3.first_line,(@3.first_column+1)));
                                                    $$ = $1;
                                                }
            |   listaIds ',' ID '=' exprecion   {
                                                    $1.push(new Declaracion($3,$5,@3.first_line,(@3.first_column+1)));
                                                    $$ = $1;
                                                }
            |   ID                              {
                                                    $$ = [new Declaracion($1,null,@1.first_line,(@1.first_column+1))];
                                                }
            |   ID '=' exprecion                {
                                                    $$ = [new Declaracion($1,$3,@1.first_line,(@1.first_column+1))];
                                                }
            ;


exprecion   :   exprecion '+' exprecion     {console.log("+"); $$ = new Operacion($1,$3,0,@1.first_line, (@1.first_column+1));}
            |   exprecion '-' exprecion     {console.log("-"); $$ = new Operacion($1,$3,1,@1.first_line, (@1.first_column+1));}
            |   exprecion '/' exprecion     {console.log("/"); $$ = new Operacion($1,$3,3,@1.first_line, (@1.first_column+1));}
            |   exprecion '^' exprecion     {console.log("^"); $$ = new Operacion($1,$3,5,@1.first_line, (@1.first_column+1));}
            |   exprecion '*' exprecion     {console.log("*"); $$ = new Operacion($1,$3,2,@1.first_line, (@1.first_column+1));}
            |   exprecion '%' exprecion     {console.log("%"); $$ = new Operacion($1,$3,4,@1.first_line, (@1.first_column+1));}
            |   exprecion '>' exprecion     {console.log(">"); $$ = new Relacional($1,$3,3,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '<' exprecion     {console.log("<"); $$ = new Relacional($1,$3,2,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '>=' exprecion    {console.log(">="); $$ = new Relacional($1,$3,5,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '<=' exprecion    {console.log("<="); $$ = new Relacional($1,$3,4,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '!=' exprecion    {console.log("!="); $$ = new Relacional($1,$3,1,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '==' exprecion    {console.log("=="); $$ = new Relacional($1,$3,0,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '~' exprecion     {console.log("~"); $$ = new Relacional($1,$3,6,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));}
            |   exprecion '||' exprecion    {console.log("||"); $$ = new Logica($1,$3,1,@1.first_line, (@1.first_column+1));}
            |   exprecion '|&' exprecion    {console.log("|&"); $$ = new Logica($1,$3,2,@1.first_line, (@1.first_column+1));}
            |   exprecion '&&' exprecion    {console.log("&&"); $$ = new Logica($1,$3,0,@1.first_line, (@1.first_column+1));}
            |   '!' exprecion               {console.log("!"); $$ = new Logica($1,$3,3,@1.first_line, (@1.first_column+1));}
            |   f                           {$$=$1;}
            ;

f   :   '(' exprecion ')'           {$$=$2;}
    |   DECIMAL                     {$$=new Literal($1,@1.first_line, (@1.first_column+1),0);}
    |   ENTERO                      {$$=new Literal($1,@1.first_line, (@1.first_column+1),3);}
    |   CADENA                      {$$=new Literal($1.replace(/\"/g,""),@1.first_line, (@1.first_column+1),2);}
    |   TRUE                        {$$=new Literal(true,@1.first_line, (@1.first_column+1),1);}
    |   FALSE                       {$$=new Literal(false,@1.first_line, (@1.first_column+1),1);}
    |   ID                          {$$=new Acceder($1, @1.first_line,(@1.first_column+1));}
    |   ID '(' ')'                  {console.log("funcion vacia");}
    |   ID '(' parametrosEnviar ')' {console.log("funcion parametros");}
    ;