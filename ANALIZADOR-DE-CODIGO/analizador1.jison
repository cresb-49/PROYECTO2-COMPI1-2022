%{
    //codigo insertado
    const {StringBuilder} = require('./../Strings/StringBuilder');
    const {Declaracion} = require('./../Instrucciones/Declaracion.ts');
    const {Funcion} = require('./../Instrucciones/Funcion.ts');
    const {CallFuncion} = require('./../Instrucciones/CallFuncion.ts');
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
    const {Importar} = require('./../Instrucciones/Importar.ts');

    const {DrawAST} = require('./../Instrucciones/DrawAST.ts');
    const {DrawEXP} = require('./../Instrucciones/DrawEXP.ts');
    const {DrawTS} = require('./../Instrucciones/DrawTS.ts');
    
    const {Principal} = require('./../Instrucciones/Principal.ts');

    const {Acceder} = require ('./../Expresion/Acceder.ts');
    const {Literal} = require ('./../Expresion/Literal.ts');
    const {Logica} = require ('./../Expresion/Logica.ts');
    const {Operacion} = require ('./../Expresion/Operacion.ts');
    const {Relacional} = require ('./../Expresion/Relacional.ts');
    const {ObtenerValFuncion} = require ('./../Expresion/ObtenerValFuncion.ts');




    //const {ConsolaCRLComponent} = require('./../../consola-crl/consola-crl.component.ts');

    let INCERTEZA_GLOBAL = 0.5;
    let RESULT_STRING_LEC = new StringBuilder();
    let INSTRUCCIONES_RECUPERADAS=[];


    function errorAnalisisCodigo(element,er){
        //console.log("Error sintactico: "+er+" en la liena: "+element._$.first_line+" ,en la columna: "+(element._$.first_column+1)+" ,Esperados: "+element._$);
        console.log("Error sintactico: "+er+" en la liena: "+element._$.first_line+" ,en la columna: "+(element._$.first_column+1));
    }

    function agregarTipoDeclaracion(tipo,elementos,identacion){
        //console.log('Tipo: '+tipo);
        //console.log('Identacion: '+identacion.length);
        //console.log('Elementos: '+elementos);
        elementos.forEach(element => {
            element.setTipo(tipo);
            //console.log(element);
        });
    }

    function agregarScope2Declaraciones(identacion,instr){
        //console.log("Identacion agregar: "+identacion.length);
        //console.log(instr);
        instr.forEach(ele=>{
            ele.setScope2(identacion.length);
        });
    }

    function agregarScope2(identacion,instr){
        //console.log("Identacion agregar: "+identacion.length);
        //console.log(instr);
        instr.setScope2(identacion.length);
    }
%}


%lex

identificador ([a-zA-Z_$]([a-zA-Z_$]|[0-9])*)

%%

\t+                 {
                        //console.log('Identacion');
                        return 'IDENTACION';
                    }
\n                  {
                        //console.log('Salto de linea');
                    }
\s                  {
                        /*ingnorado*/
                    }
[0-9]+              {return 'ENTERO';}
[0-9]+"."[0-9]+     {return 'DECIMAL';}
(\"[^"]*\")         {return 'CADENA';}
(\'[^"]\')          {return 'CARACTER';}
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
                                INCERTEZA_GLOBAL = 0.5;
                                return $1;
                            }
        ;

inicioCode  :   listaImportacion defIncerteza instrucciones
            |   listaImportacion instrucciones
            |   defIncerteza instrucciones
            |   instrucciones   {$$=$1;}
            ;

listaImportacion    :   listaImportacion importacion
                    |   importacion
                    ;

importacion :   IMPORTAR ID EXTENCION_CRL   {$$ = new Importar($2,@1.first_line,(@1.first_column+1));}
            ;

defIncerteza    :   INCERTEZA DECIMAL   {
                                            console.log("incerteza: "+$2);
                                            INCERTEZA_GLOBAL = Number($2);
                                        }
                ;

instrucciones   :   instrucciones instruction   {$1.push($2);$$ = $1;}
                |   instruction     {$$=[$1];}
                ;

instruction     :   instructionGlobal           {$$ = $1;}
                |   instruccionFuncionMetodo    {$$ = $1;}
                |   VOID PRINCIPAL '(' ')' ':'  {$$ = new Principal("",null,@2.first_line,(@2.first_column+1));}
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

funcionDibujarTs    :   IDENTACION DIBUJAR_TS '('')'    {$$ = new DrawTS(-1,-1,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

funcionDibujarExp   :   IDENTACION DIBUJAR_EXP '(' exprecion ')'    {$$ = new DrawEXP($4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

funcionDibujarAST   :   IDENTACION DIBUJAR_AST '(' identificador ')'    {$$ = new DrawAST($4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

funcionMostrar  :   IDENTACION MOSTRAR '(' exprecion ',' parametrosEnviar ')'   {
                                                                                    //console.log("identacion mostrar");
                                                                                    $$ = new Mostrar($4,[],@2.first_line,@2.first_column);
                                                                                    agregarScope2($1,$$);
                                                                                    //INSTRUCCIONES_RECUPERADAS.push($$);
                                                                                }
                |   IDENTACION MOSTRAR '(' exprecion ')'    {
                                                                //console.log("identacion mostrar");
                                                                $$ = new Mostrar($4,[],@2.first_line,@2.first_column);
                                                                agregarScope2($1,$$);
                                                                //INSTRUCCIONES_RECUPERADAS.push($$);
                                                            }
                ;

sentenciaContinuar  :   IDENTACION CONTINUAR    {$$ = new Continuar(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaDetener    :   IDENTACION DETENER  {$$ = new Detener(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'   {$$ = new Mientras($4,null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'    {
                                                                                                    $$ = new Para($5,$7,$9,$10,null,@2.first_line,(@2.first_column+1));
                                                                                                    //console.log($1.length);console.log(@2.first_line);console.log(@2.first_column);console.log($5);console.log($7);console.log($9);console.log($10);
                                                                                                    agregarScope2($1,$$);
                                                                                                }
                ;

opPara  :   '++'    {$$ = 0;}
        |   '--'    {$$ = 1;}
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':' {$$ = new Si($4,null,null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            |   IDENTACION SINO ':'                 {$$ = new Sino(null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion    {$$ = new Retorno($3,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

llamarFuncion   :   IDENTACION ID '(' parametrosEnviar ')'  {$$ = new CallFuncion($1,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                |   IDENTACION ID '(' ')'   {$$ = new CallFuncion($1,[],@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                ;

parametrosEnviar    :   parametrosEnviar ',' exprecion  {$1.push($3);$$=$1;}
                    |   exprecion   {$$=[$1];}
                    ;

instruccionFuncionMetodo    :   tipoDato ID '(' parametros ')' ':'  {$$ = new Funcion($1,$2,null,$4,@2.first_line,(@2.first_column+1));}
                            |   tipoDato ID '(' ')' ':'  {$$ = new Funcion($1,$2,null,[],@2.first_line,(@2.first_column+1));}
                            ;

parametros  :   parametros ',' tipoDato ID  {$1.push(new Declaracion($4,$3,null,@4.first_line,(@4.first_column+1)));$$ = $1;}
            |   tipoDato ID {$$=[new Declaracion($2,$1,null,@2.first_line,(@2.first_column+1))]}
            ;

instruccionAsignar  :   ID '=' exprecion                {$$ = new Asignacion($1,$3,@1.first_line,(@1.first_column+1));agregarScope2("",$$);}
                    |   IDENTACION ID '=' exprecion     {$$ = new Asignacion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}}
                    ;

instruccionDeclarar :   IDENTACION tipoDato listaIds    {$$ = $3;agregarTipoDeclaracion($2,$3,$1);agregarScope2Declaraciones($1,$$);}}
                    |   tipoDato listaIds               {$$ = $2;agregarTipoDeclaracion($1,$2,"");agregarScope2Declaraciones("",$$);}
                    ;
                
tipoDato    :   INT         {$$=3;}
            |   STRING      {$$=2;}
            |   CHAR        {$$=4;}
            |   DOUBLE      {$$=0;}
            |   BOOLEAN     {$$=1;}
            |   VOID        {$$=5;}
            ;

listaIds    :   listaIds ',' ID                 {
                                                    $1.push(new Declaracion($3,-1,null,@3.first_line,(@3.first_column+1)));
                                                    $$ = $1;
                                                }
            |   listaIds ',' ID '=' exprecion   {
                                                    $1.push(new Declaracion($3,-1,$5,@3.first_line,(@3.first_column+1)));
                                                    $$ = $1;
                                                }
            |   ID                              {
                                                    $$ = [new Declaracion($1,-1,null,@1.first_line,(@1.first_column+1))];
                                                }
            |   ID '=' exprecion                {
                                                    $$ = [new Declaracion($1,-1,$3,@1.first_line,(@1.first_column+1))];
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
    |   CARACTER                    {$$=new Literal($1.replace(/\'/g,""),@1.first_line, (@1.first_column+1),4);}
    |   TRUE                        {$$=new Literal(true,@1.first_line, (@1.first_column+1),1);}
    |   FALSE                       {$$=new Literal(false,@1.first_line, (@1.first_column+1),1);}
    |   ID                          {$$=new Acceder($1, @1.first_line,(@1.first_column+1));}
    |   ID '(' ')'                  {$$ = new ObtenerValFuncion($1,[],@1.first_line,(@1.first_column+1));}
    |   ID '(' parametrosEnviar ')' {$$ = new ObtenerValFuncion($1,$3,@1.first_line,(@1.first_column+1));}
    ;