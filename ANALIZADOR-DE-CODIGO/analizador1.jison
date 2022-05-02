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
    
    
    
    const {Result} = require ('./../Result/Result.ts');

    const {Tipo}= require ('./../Abstracto/Retorno.ts');


    const {Pila}= require ('./../EDD/Pila.ts');


    //const {ConsolaCRLComponent} = require('./../../consola-crl/consola-crl.component.ts');

    let INCERTEZA_GLOBAL = 0.5;
    //let RESULT_STRING_LEC = new StringBuilder();
    let ERRORES_ANALISIS=[];

    let SENTENCIAS_GENERADAS = [];


    let MEMORIA_PRINCIPAL = new Pila();
    let OBJ_MOSTRAR = [];



    function errorAnalisisCodigo(element,er){
        //console.log("Error sintactico: "+er+" en la liena: "+element._$.first_line+" ,en la columna: "+(element._$.first_column+1)+" ,Esperados: "+element._$);
        let tmp = "Error sintactico: \""+er+"\" ,Linea: "+element._$.first_line+" ,Columna: "+(element._$.first_column+1);
        console.log(tmp);
        ERRORES_ANALISIS.push(tmp);
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

    function agregarInstrucciones(instrucciones,elemento){
        if(Array.isArray(elemento)){
            elemento.forEach(ele=>{
                instrucciones.push(ele);
            });
        }else{
            instrucciones.push(elemento);
        }

        return instrucciones
    }

    function sumarArray(imports,instrucciones){
        return imports.concat(instrucciones);
    }

    function agregadoFuncion(funcion){
        MEMORIA_PRINCIPAL.push(funcion);
    }

    function addInstruccionSi(si){
        if(MEMORIA_PRINCIPAL.size() == 0){
            let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
            ERRORES_ANALISIS.push(tmp);
        }else{
            let ident = MEMORIA_PRINCIPAL.peek().getScope2();
            if(si.getScope2() == 0){
                console.log("Debuj al sacar elemento de la pila if");
                let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                ERRORES_ANALISIS.push(tmp);
                //TODO: verificar si es necesario meter la instruccion en la pila
            }else{
                if(si instanceof Si){
                    if(((si.getScope2()-1) == ident)||(si.getScope2()==ident)){
                        MEMORIA_PRINCIPAL.push(si);
                    }else{
                        let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                        ERRORES_ANALISIS.push(tmp);
                    }
                }else if(si instanceof Sino){
                    if(MEMORIA_PRINCIPAL.peek() instanceof Si){
                        if(si.getScope2() == ident){
                            MEMORIA_PRINCIPAL.push(si);
                        }else{
                            let tmp = "Error Semantico: \"Sino\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La intruccion no tiene la identacion correcta se esperaba: "+ident;
                            ERRORES_ANALISIS.push(tmp);    
                            //TODO: verificar si es necesario meter la instruccion en la pila
                        }
                    }else{
                        let tmp = "Error Semantico: \"Sino\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La intruccion necesita de la precedencia de la instruccion Si";
                        ERRORES_ANALISIS.push(tmp);
                    }
                }else{
                    console.log("Se utilizo la funcion incorrecta -> Linea: "+si.linea+" ,Columna: "+si.columna);
                }
            }
        }
    }

    function addIntruccionMientrasPara(instr){
        let tipo = "undefined";
        if(instr instanceof Para){
            tipo = "Para";
        }else if( instr instanceof Mientras){
            tipo = "Mientras";
        }
        if(MEMORIA_PRINCIPAL.peek().size()==0){
            let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+instr.linea+" ,Columna: "+instr.columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
            ERRORES_ANALISIS.push(tmp);
        }else{
            let ident = MEMORIA_PRINCIPAL.peek().getScope2();
            if(instr.getScope2() == 0){
                let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                ERRORES_ANALISIS.push(tmp);
            }else{
                if(((instr.getScope2()-1) == ident)||(instr.getScope2()==ident)){
                    MEMORIA_PRINCIPAL.push(instr);
                }else{
                    let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                    ERRORES_ANALISIS.push(tmp);
                    //TODO: verificar si es necesario meter la instruccion en la pila
                }
            }
        }
    }

    function addSimpleInst(instruccion){
        if(Array.isArray(elemento)){

        }else{

        }
    }


    function respuestaAnalisis(){

    }

    function generarSentencias(linea,columna){
        let result = new Sentencias([],linea,columna);
        SENTENCIAS_GENERADAS.push(result);
        return result;
    }
    
%}


%lex

identificador ([a-zA-Z_$]([a-zA-Z_$]|[0-9])*)

%%

\t+               {
                        //console.log('Identacion');
                        return 'IDENTACION';
                    }
\n                  {
                        return 'NUEVA_LINEA';
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

%left   '+','-'
%left   '*','/','%'
%right  '^'
%left   '<','>','<=','>='
%left   '==','!=','~'
%left   '||'
%left   '|&'
%left   '&&'
%left   '!'
%left UMINUS

//mas precendecia 
%start Init

%%

Init    : inicioCode EOF    {
                                INCERTEZA_GLOBAL = 0.5;
                                let errorTemp = ERRORES_ANALISIS;
                                ERRORES_ANALISIS = [];
                                return new Result($1,errorTemp);
                            }
        ;

inicioCode  :   listaImportacion defIncerteza instrucciones {$$ = sumarArray($1,$3);}
            |   listaImportacion instrucciones  {$$ = sumarArray($1,$2);}
            |   defIncerteza instrucciones  {$$ = $2;}
            |   instrucciones   {$$ = $1;}
            ;

listaImportacion    :   listaImportacion importacion {$1.push($2);$$ = $1;}
                    |   importacion {$$ = [$1];}
                    ;

importacion :   IMPORTAR ID EXTENCION_CRL   {$$ = new Importar($2,@1.first_line,(@1.first_column+1));}
            ;

defIncerteza    :   INCERTEZA DECIMAL   {
                                            console.log("incerteza: "+$2);
                                            INCERTEZA_GLOBAL = Number($2);
                                        }
                ;

instrucciones   :   instrucciones instruction   {$$ = agregarInstrucciones($1,$2);}//{$1.push($2);$$ = $1;}
                |   instruction     {$$ = agregarInstrucciones([],$1);}//{$$=[$1];}
                ;

instruction     :   instructionGlobal NUEVA_LINEA           {$$ = $1;}
                |   instruccionFuncionMetodo NUEVA_LINEA    {$$ = $1;}
                |   VOID PRINCIPAL '(' ')' ':' NUEVA_LINEA  {$$ = new Principal("",generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));}
                |   NUEVA_LINEA
                |   IDENTACION NUEVA_LINEA
                |   error                                   {errorAnalisisCodigo(this,$1);}
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

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'   {$$ = new Mientras($4,generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'    {
                                                                                                    $$ = new Para($5,$7,$9,$10,generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));
                                                                                                    //console.log($1.length);console.log(@2.first_line);console.log(@2.first_column);console.log($5);console.log($7);console.log($9);console.log($10);
                                                                                                    agregarScope2($1,$$);
                                                                                                }
                ;

opPara  :   '++'    {$$ = 0;}
        |   '--'    {$$ = 1;}
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':' {$$ = new Si($4,generarSentencias(@2.first_line,(@2.first_column+1)),null,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            |   IDENTACION SINO ':'                 {$$ = new Sino(generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion    {$$ = new Retornar($3,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                    ;

llamarFuncion   :   IDENTACION ID '(' parametrosEnviar ')'  {$$ = new CallFuncion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                |   IDENTACION ID '(' ')'   {$$ = new CallFuncion($2,[],@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}
                ;

parametrosEnviar    :   parametrosEnviar ',' exprecion  {$1.push($3);$$=$1;}
                    |   exprecion   {$$=[$1];}
                    ;

instruccionFuncionMetodo    :   tipoDato ID '(' parametros ')' ':'  {$$ = new Funcion($1,$2,generarSentencias(@2.first_line,(@2.first_column+1)),$4,@2.first_line,(@2.first_column+1));}
                            |   tipoDato ID '(' ')' ':'  {$$ = new Funcion($1,$2,generarSentencias(@2.first_line,(@2.first_column+1)),[],@2.first_line,(@2.first_column+1));}
                            ;

parametros  :   parametros ',' tipoDato ID  {$1.push(new Declaracion($4,$3,null,@4.first_line,(@4.first_column+1)));$$ = $1;}
            |   tipoDato ID {$$=[new Declaracion($2,$1,null,@2.first_line,(@2.first_column+1))]}
            ;

instruccionAsignar  :   ID '=' exprecion                {$$ = new Asignacion($1,$3,@1.first_line,(@1.first_column+1));agregarScope2("",$$);}
                    |   IDENTACION ID '=' exprecion     {$$ = new Asignacion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);}}
                    ;

instruccionDeclarar :   IDENTACION tipoDato listaIds    {$$ = $3;agregarTipoDeclaracion($2,$$,$1);agregarScope2Declaraciones($1,$$);}}
                    |   tipoDato listaIds               {$$ = $2;agregarTipoDeclaracion($1,$$,"");agregarScope2Declaraciones("",$$);}
                    ;
                
tipoDato    :   INT         {$$=Tipo.INT;}
            |   STRING      {$$=Tipo.STRING;}
            |   CHAR        {$$=Tipo.CHAR;}
            |   DOUBLE      {$$=Tipo.DOUBLE;}
            |   BOOLEAN     {$$=Tipo.BOOLEAN;}
            |   VOID        {$$=Tipo.VOID;}
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


exprecion   :   '-' exprecion %prec UMINUS  {console.log("- uninus"); $$ = new Operacion(new Literal("-1",@1.first_line, (@1.first_column+1),3),$2,2,@1.first_line, (@1.first_column+1));}
            |   exprecion '+' exprecion     {console.log("+"); $$ = new Operacion($1,$3,0,@1.first_line, (@1.first_column+1));}
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
    |   DECIMAL                     {$$=new Literal($1,@1.first_line, (@1.first_column+1),Tipo.DOUBLE);}
    |   ENTERO                      {$$=new Literal($1,@1.first_line, (@1.first_column+1),Tipo.INT);}
    |   CADENA                      {$$=new Literal($1.replace(/\"/g,""),@1.first_line, (@1.first_column+1),Tipo.STRING);}
    |   CARACTER                    {$$=new Literal($1.replace(/\'/g,""),@1.first_line, (@1.first_column+1),Tipo.CHAR);}
    |   TRUE                        {$$=new Literal(true,@1.first_line, (@1.first_column+1),Tipo.BOOLEAN);}
    |   FALSE                       {$$=new Literal(false,@1.first_line, (@1.first_column+1),Tipo.BOOLEAN);}
    |   ID                          {$$=new Acceder($1, @1.first_line,(@1.first_column+1));}
    |   ID '(' ')'                  {$$ = new ObtenerValFuncion($1,[],@1.first_line,(@1.first_column+1));}
    |   ID '(' parametrosEnviar ')' {$$ = new ObtenerValFuncion($1,$3,@1.first_line,(@1.first_column+1));}
    ;