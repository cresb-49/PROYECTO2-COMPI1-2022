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
    let INCERTEZA_GLOBAL_IS_ASIG = false;
    let lienaUbicacion =1;

    //let RESULT_STRING_LEC = new StringBuilder();
    let ERRORES_ANALISIS=[];

    let SENTENCIAS_GENERADAS = [];
    let VARIABLES_GLOBALES = [];
    let IMPORTACION_ARCHIVOS = [];

    let FUNCION_PRINCIPAL = null;

    let PILA_ANALISIS_SI = new Pila();


    let MEMORIA_PRINCIPAL = new Pila();

    let OBJ_MOSTRAR = [];

    let FUNCIONES_DECLARADAS = [];

    let IMPORTS_USADOS = [];



    function errorAnalisisCodigo(element,er,linea){
        let simbolo = er;
        if(er == '\n'){
            simbolo = '\\n';
        }else if(er == '\t'){
            simbolo = '\\t';
        }
        let tmp = "Error sintactico: \""+simbolo+"\" ,Linea: "+(linea+1)+" ,Columna: "+(element._$.first_column+1);
        console.log(tmp);
        ERRORES_ANALISIS.push(tmp);
    }

    function agregarTipoDeclaracion(tipo,elementos,identacion){
        elementos.forEach(element => {
            element.setTipo(tipo);
        });
    }

    function agregarValorDeclaracion(declaraciones,exprecion){
        declaraciones.forEach(declaracion=>{
            declaracion.setValor(exprecion);
        });
    }

    function agregarScope2Declaraciones(identacion,instr){
        instr.forEach(ele=>{
            ele.setScope2(identacion.length);
        });
    }

    function agregarScope2(identacion,instr){
        instr.setScope2(identacion.length);
    }
    
    function verificarVarFuncion(vars,nueva){
        let result = vars.filter(v => v.getId() == nueva.getId());
        if(result.length != 0){
            let tmp = "Error Semantico: \""+nueva.getId()+"\" Linea: "+nueva.linea+" ,Columna: "+nueva.columna+"-> No puede declara otra variable con el mismo identificador";
            ERRORES_ANALISIS.push(tmp);
        }
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
        plegarPila();
        MEMORIA_PRINCIPAL.pop();
        MEMORIA_PRINCIPAL.push(funcion);
    }

    function addInstruccionSi(si){
        if(MEMORIA_PRINCIPAL.size() == 0){
            let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
            ERRORES_ANALISIS.push(tmp);
        }else{
            let ident = MEMORIA_PRINCIPAL.peek().getScope2();
            if(si.getScope2() == 0){
                //console.log("Debuj al sacar elemento de la pila if");
                let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                ERRORES_ANALISIS.push(tmp);
            }else{
                if(si instanceof Si){
                    if(((si.getScope2()-1) == ident)||(si.getScope2()==ident)){
                        MEMORIA_PRINCIPAL.push(si);
                        PILA_ANALISIS_SI.push(si);
                    }else if(si.getScope2() < ident){
                        let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
                        //console.log("Scope padre actual: "+scopePadre);
                        //console.log("La instruccion Linea: "+si.linea+" ,Columna: "+si.columna+" no pertenece al scope");
                        let tmp = [];
                        while(scopePadre == MEMORIA_PRINCIPAL.peek().getScope2()){
                            tmp.push(MEMORIA_PRINCIPAL.pop());
                        }
                        //console.log("Intrucciones recuperadas: ");
                        let recuperacion = tmp.reverse();
                        //console.log(recuperacion);
                        recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                        //console.log("Memoria actual:")
                        //MEMORIA_PRINCIPAL.print();
                        addInstruccionSi(si);
                    }else{
                        let tmp = "Error Semantico: \"Si\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                        ERRORES_ANALISIS.push(tmp);
                    }
                }else if(si instanceof Sino){
                    if(PILA_ANALISIS_SI.size() != 0 ){
                        let siTmp = PILA_ANALISIS_SI.peek();
                        if(si.getScope2() == siTmp.getScope2()){
                            MEMORIA_PRINCIPAL.push(si);
                            PILA_ANALISIS_SI.pop().setCodeFalse(si.getCodeFalse());
                        }else if(si.getScope2() < siTmp.getScope2()){
                            //Verificacion de que haya un si que tenga la misma identacion y en base a eso hacer el algoritmo de ir hacia atras
                            let array = PILA_ANALISIS_SI.getArray();
                            let bandera = false;
                            array.forEach(s=>{
                                if(si.getScope2() == s.getScope2()){
                                    bandera = true;
                                }
                            });
                            if(bandera){
                                if(si.getScope2() < ident){
                                    PILA_ANALISIS_SI.pop();
                                    let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
                                    //console.log("Scope padre actual: "+scopePadre);
                                    //console.log("La instruccion Linea: "+si.linea+" ,Columna: "+si.columna+" no pertenece al scope");
                                    let tmp = [];
                                    while(scopePadre == MEMORIA_PRINCIPAL.peek().getScope2()){
                                        tmp.push(MEMORIA_PRINCIPAL.pop());
                                    }
                                    //console.log("Intrucciones recuperadas: ");
                                    let recuperacion = tmp.reverse();
                                    //console.log(recuperacion);
                                    recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                                    //console.log("Memoria actual:");
                                    //MEMORIA_PRINCIPAL.print();
                                    addInstruccionSi(si);
                                }else{
                                    let tmp = "Error Semantico: \"Sino\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La identacion de la intruccion es incorrecta se esperaba: "+ident+" - "(ident+1);
                                    ERRORES_ANALISIS.push(tmp);    
                                }                                
                            }else{
                                let tmp = "Error Semantico: \"Sino\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La intruccion necesita de la precedencia de la instruccion Si";
                                ERRORES_ANALISIS.push(tmp);
                            }
                        }else{
                            let tmp = "Error Semantico: \"Sino\" ,Linea: "+si.linea+" ,Columna: "+si.columna+"-> La intruccion necesita de la precedencia de la instruccion Si";
                            ERRORES_ANALISIS.push(tmp);
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
        if(MEMORIA_PRINCIPAL.size()==0){
            let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+instr.linea+" ,Columna: "+instr.columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
            ERRORES_ANALISIS.push(tmp);
        }else{
            let ident = MEMORIA_PRINCIPAL.peek().getScope2();
            if(instr.getScope2() == 0){
                let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+instr.linea+" ,Columna: "+instr.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                ERRORES_ANALISIS.push(tmp);
            }else{
                if(((instr.getScope2()-1) == ident)||(instr.getScope2()==ident)){
                    MEMORIA_PRINCIPAL.push(instr);
                }else if(instr.getScope2() < ident){
                    let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
                    //console.log("Scope padre actual: "+scopePadre);
                    //console.log("La instruccion Linea: "+instr.linea+" ,Columna: "+instr.columna+" no pertenece al scope");
                    let tmp = [];
                    while(scopePadre==MEMORIA_PRINCIPAL.peek().getScope2()){
                        tmp.push(MEMORIA_PRINCIPAL.pop());
                    }
                    //console.log("Instrucciones recuperadas");
                    let recuperacion = tmp.reverse();
                    //console.log(recuperacion);
                    recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                    //console.log("Memoria actual: ");
                    //MEMORIA_PRINCIPAL.print();
                    addIntruccionMientrasPara(instr);
                }else{
                    let tmp = "Error Semantico: \""+tipo+"\" ,Linea: "+instr.linea+" ,Columna: "+instr.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                    ERRORES_ANALISIS.push(tmp);
                }
            }
        }
    }

    function addSimpleInst(instruccion){
        if(Array.isArray(instruccion)){
            if(MEMORIA_PRINCIPAL.size() == 0){
                if(instruccion[0].getScope2() == 0){
                    instruccion.forEach(ele=>{
                        VARIABLES_GLOBALES.push(ele);
                    });
                }else{
                    let tmp = "Error Semantico: Declaracion ,Linea: "+instruccion[0].linea+" ,Columna: "+instruccion[0].columna+"-> No se esperaba una identacion";
                    ERRORES_ANALISIS.push(tmp);
                }
            }else{
                let ident = MEMORIA_PRINCIPAL.peek().getScope2();
                if(instruccion[0].getScope2() == 0){
                    let tmp = "Error Semantico Linea: "+instruccion[0].linea+" ,Columna: "+instruccion[0].columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
                    ERRORES_ANALISIS.push(tmp);
                }else{
                    if(instruccion[0].getScope2() == (ident+1)){
                        instruccion.forEach(ele=>{
                            if(MEMORIA_PRINCIPAL.peek().getSentencias().verrificarExistenciaVar(ele)){
                                let tmp = "Error Semantico \""+ele.getId()+"\" Linea: "+ele.linea+" ,Columna: "+ele.columna+"-> La variable ya esta declarada dentro de este ambito";
                                ERRORES_ANALISIS.push(tmp);
                            }
                            MEMORIA_PRINCIPAL.peek().agregar(ele);
                        });
                    }else if (instruccion[0].getScope2() <= (ident+1)){
                        let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
                        //console.log("Scope padre actual: "+scopePadre);
                        //console.log("La instruccion Linea: "+instruccion[0].linea+" ,Columna: "+instruccion[0].columna+" no pertenece al scope");
                        let tmp2 = [];
                        while(scopePadre==MEMORIA_PRINCIPAL.peek().getScope2()){
                            tmp2.push(MEMORIA_PRINCIPAL.pop());
                        }
                        //console.log("Intrucciones recuperadas: ");
                        let recuperacion = tmp2.reverse();
                        //console.log(recuperacion);
                        recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                        //console.log("Memoria actual:");
                        //MEMORIA_PRINCIPAL.print();
                        addSimpleInst(instruccion);
                    }else{
                        let tmp = "Error Semantico: Declaracion Linea: "+instruccion[0].linea+" ,Columna: "+instruccion[0].columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                        ERRORES_ANALISIS.push(tmp);
                    }
                }
            }            
        }else{
            if(MEMORIA_PRINCIPAL.size()==0){
                let tmp = "Error Semantico: Instruccion Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion solo puede estar dentro de una funcion o metodo";
                ERRORES_ANALISIS.push(tmp);
            }else{
                let ident = MEMORIA_PRINCIPAL.peek().getScope2();
                if(instruccion.getScope2() == 0){
                    let tmp = "Error Semantico Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                    ERRORES_ANALISIS.push(tmp); 
                }else{
                    let banderaEje = true;
                    if(instruccion instanceof Continuar){
                        banderaEje = verificarContinuarDetener();
                    }else if(instruccion instanceof Detener){
                        banderaEje = verificarContinuarDetener();
                    }else if(instruccion instanceof Retornar){
                        banderaEje = verificarRetornar();
                    }
                    if(banderaEje){
                        if(instruccion.getScope2() == (ident+1)){
                            MEMORIA_PRINCIPAL.peek().agregar(instruccion);
                        }else if(instruccion.getScope2()<=ident){
                            let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
                            //console.log("Scope padre actual: "+scopePadre);
                            //console.log("La instruccion Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+" no pertenece al scope");
                            let tmp2 = [];
                            while(scopePadre==MEMORIA_PRINCIPAL.peek().getScope2()){
                                tmp2.push(MEMORIA_PRINCIPAL.pop());
                            }
                            //console.log("Intrucciones recuperadas: ");
                            let recuperacion = tmp2.reverse();
                            //console.log(recuperacion);
                            recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                            //console.log("Memoria actual:");
                            //MEMORIA_PRINCIPAL.print();
                            addSimpleInst(instruccion);
                        }else{
                            let tmp = "Error Semantico: Intruccion Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion esta mal identada, la identacion esperada: "+ident+" - "+(ident+1);
                            ERRORES_ANALISIS.push(tmp);
                        }
                    }else{
                        if(instruccion instanceof Detener){
                            let tmp = "Error Semantico: Detener Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion no puede estar en este ambito";
                            ERRORES_ANALISIS.push(tmp);
                        }else if(instruccion instanceof Continuar){
                            let tmp = "Error Semantico: Continuar Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion no puede estar en este ambito";
                            ERRORES_ANALISIS.push(tmp);
                        }else if(instruccion instanceof Retornar){
                            let tmp = "Error Semantico: Retorno Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion no puede estar en este ambito";
                            ERRORES_ANALISIS.push(tmp);
                        }else{
                            let tmp = "Error Semantico Linea: "+instruccion.linea+" ,Columna: "+instruccion.columna+"-> La instruccion no puede estar en este ambito";
                            ERRORES_ANALISIS.push(tmp);
                        }
                    }
                }
            }
        }
    }

    function verificarContinuarDetener(){
        let bandera = false;
        let memory = MEMORIA_PRINCIPAL.getArray();
        memory.forEach(intr =>{
            if(intr instanceof Para){
                bandera = true;
            }else if(intr instanceof Mientras){
                bandera = true;
            }
        });
        return bandera;
    }

    function verificarRetornar(){
        let bandera = false;
        let memory = MEMORIA_PRINCIPAL.getArray();
        memory.forEach(intr =>{
            if(intr instanceof Funcion){
                if(intr.getTipo() != Tipo.VOID){
                    bandera = true;
                }
            }
        });
        return bandera;
    }

    function generarSentencias(linea,columna){
        let result = new Sentencias([],linea,columna);
        SENTENCIAS_GENERADAS.push(result);
        return result;
    }

    function plegarPila(){
        if(MEMORIA_PRINCIPAL.size() != 0){
            let scopePadre = MEMORIA_PRINCIPAL.peek().getScope2();
            if(scopePadre != 0){
                //console.log("Scope padre actual: "+scopePadre);
                let tmp = [];
                while(scopePadre == MEMORIA_PRINCIPAL.peek().getScope2()){
                    tmp.push(MEMORIA_PRINCIPAL.pop());
                }
                //console.log("Intrucciones recuperadas: ");
                let recuperacion = tmp.reverse();
                //console.log(recuperacion);
                recuperacion.forEach(ele=>{MEMORIA_PRINCIPAL.peek().agregar(ele);});
                //console.log("Memoria actual:");
                //MEMORIA_PRINCIPAL.print();
                plegarPila();
            }
        }else{
            MEMORIA_PRINCIPAL.pop();
        }
    }

    function agregarImport(imp){
        let result = IMPORTACION_ARCHIVOS.filter( i => i.getId() === imp.getId());
        if(result.length >= 1){
            let tmp = "Error Semantico: Importar Linea: "+imp.linea+" ,Columna: "+imp.columna+"-> Ya se hizo referencia anteriormente a \""+imp.getId()+".crl"+"\"";
            ERRORES_ANALISIS.push(tmp);
        }else{
            IMPORTACION_ARCHIVOS.push(imp);
        }
    }

    function agregarFPrincipal(f){
        if(FUNCION_PRINCIPAL == null){
            FUNCION_PRINCIPAL = f;
        }else{
            let tmp = "Error Semantico: Principal Linea: "+f.linea+" ,Columna: "+f.columna+"-> Solo puede existir una funcion principal";
            ERRORES_ANALISIS.push(tmp);
        }
    }

    
    function respuestaAnalisis(lista){
        if(MEMORIA_PRINCIPAL.size()>0){
            plegarPila();
        }

        INCERTEZA_GLOBAL = 0.5;
        
        let errorTemp = ERRORES_ANALISIS;
        let sentences = SENTENCIAS_GENERADAS;
        let mostra = OBJ_MOSTRAR;
        let varGlobales= VARIABLES_GLOBALES;
        let imports = IMPORTACION_ARCHIVOS;
        let fp = FUNCION_PRINCIPAL;

        MEMORIA_PRINCIPAL.clear();
        PILA_ANALISIS_SI.clear();
        ERRORES_ANALISIS = [];
        SENTENCIAS_GENERADAS = [];
        OBJ_MOSTRAR = [];
        VARIABLES_GLOBALES = [];
        IMPORTACION_ARCHIVOS = [];
        FUNCION_PRINCIPAL = null;
        FUNCIONES_DECLARADAS = [];
        INCERTEZA_GLOBAL_IS_ASIG = false;
        IMPORTS_USADOS = [];

        return new Result(lista,errorTemp,sentences,mostra,varGlobales,imports,fp);
    }

    function verificarExistenciaFuncion(f){
        let ref = f.getId()+"-"+f.codigoReferencia();
        let res = FUNCIONES_DECLARADAS.filter(fu => fu === ref);
        if(res.length == 0){
            FUNCIONES_DECLARADAS.push(ref);
        }else{
            let tmp = "Error Semantico: \""+f.getId()+"\" Linea: "+f.linea+" ,Columna: "+f.columna+"-> Ya hay una funcion con el mismo nombre y parametros de entrada";
            ERRORES_ANALISIS.push(tmp);
        }
        // let res = FUNCIONES_DECLARADAS.filter(fu => fu.getId() == f.getId());
        // if(res.length == 0){
        //     FUNCIONES_DECLARADAS.push(f);
        // }else{
        //     let tmp = "Error Semantico: \""+f.getId()+"\" Linea: "+f.linea+" ,Columna: "+f.columna+"-> La funcion ya se declaro con anterioridad";
        //     ERRORES_ANALISIS.push(tmp);
        // }
    }

    function verificarTipoVariable(tipo,vars){
        if(tipo == Tipo.VOID){
            let tmp = "Error Semantico Linea: "+vars[0].linea+" ,Columna: "+vars[0].columna+"-> No se pueden declarar variables de tipo Void";
            ERRORES_ANALISIS.push(tmp);
        }
    }

    let UBICACION_LINEA = 1;
    function contarLineas(cadena){
        let carateres = cadena.split('');
        for(const c of cadena){
            if(c == '\n'){
                UBICACION_LINEA++;
            }
        }
    }

%}


%lex

identificador ([a-zA-Z_$]([a-zA-Z_$]|[0-9])*)

comentSimple (("!!")([^\n]*))
comentMultip ((\'\'\')([^']*)(\'\'\'))

%%

{comentSimple}      {/*Ingonorar un comentario simple*/}
{comentMultip}      {/*Ingonorar un comentario multiple*/}

\t+\n+              {
                        contarLineas(yytext);
                        return 'NUEVA_LINEA';
                    }
\t+                 {
                        //console.log('Identacion');
                        return 'IDENTACION';
                    }
\n+                 {
                        contarLineas(yytext);
                        return 'NUEVA_LINEA';
                    }
\s                  {
                        /*ingnorado*/
                    }
\r                  {
                        /*ingnorado*/
                    }   
[0-9]+"."[0-9]+     {return 'DECIMAL';}
[0-9]+              {return 'ENTERO';}
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

.               {
                    let tmp = "Error Lexico "+yytext+" Linea: "+yylloc.first_line+" , Columna: "+yylloc.first_column;
                    console.log(tmp);
                    ERRORES_ANALISIS.push(tmp);
                }

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
                                return respuestaAnalisis($1);
                            }
        ;

// inicioCode  :   listaImportacion defIncerteza instrucciones {$$ = $3;}
//             |   NUEVA_LINEA listaImportacion defIncerteza instrucciones {$$ = $4;}
//             |   listaImportacion instrucciones  {$$ = $2;}
//             |   NUEVA_LINEA listaImportacion instrucciones  {$$ = $3;}
//             |   defIncerteza instrucciones  {$$ = $2;}
//             |   NUEVA_LINEA defIncerteza instrucciones  {$$ = $3;}
//             |   instrucciones   {$$ = $1;}
//             ;

inicioCode  :   instrucciones   {$$ = $1;}
            ;

// listaImportacion    :   listaImportacion importacion {$1.push($2);$$ = $1;}
//                     |   importacion {$$ = [$1];}
//                     ;


intruccionesEncabezado  :   importacion
                        |   defIncerteza
                        ;


importacion :   IMPORTAR ID EXTENCION_CRL   {
                                                $$ = new Importar($2,@1.first_line,(@1.first_column+1));
                                                agregarImport($$);
                                                if(MEMORIA_PRINCIPAL.size() != 0){
                                                    let tmp = "Error Semantico: Importar Linea: "+$$.linea+" ,Columna: "+$$.columna+"-> Las Importaciones solo pueden estar en el encabezado";
                                                    ERRORES_ANALISIS.push(tmp);
                                                }
                                            }
            ;

defIncerteza    :   INCERTEZA DECIMAL   {
                                            if(INCERTEZA_GLOBAL_IS_ASIG){
                                                console.log("Se sobre escribio la incerteza");
                                            }
                                            if(MEMORIA_PRINCIPAL.size() != 0){  
                                                let tmp = "Error Semantico: Incerteza Linea: "+@1.first_line+" ,Columna: "+(@1.first_column+1)+"-> La Incertaza solo puede ser definida en el encabezado";
                                                ERRORES_ANALISIS.push(tmp);
                                            }
                                            console.log("incerteza: "+$2);
                                            INCERTEZA_GLOBAL = Number($2);
                                            INCERTEZA_GLOBAL_IS_ASIG = true;
                                        }
                ;

instrucciones   :   instrucciones instruction   {$$ = agregarInstrucciones($1,$2);}//{$1.push($2);$$ = $1;}
                |   instruction     {$$ = agregarInstrucciones([],$1);}//{$$=[$1];}
                ;

instruction     :   instructionGlobal NUEVA_LINEA           {$$ = $1;}
                |   instruccionFuncionMetodo NUEVA_LINEA    {$$ = $1;}
                |   intruccionesEncabezado NUEVA_LINEA
                |   VOID PRINCIPAL '(' ')' ':' NUEVA_LINEA  {
                                                                $$ = new Principal("",generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));
                                                                agregadoFuncion($$);
                                                                agregarFPrincipal($$);
                                                            }
                |   NUEVA_LINEA
                |   IDENTACION NUEVA_LINEA
                |   error                                   {
                                                                errorAnalisisCodigo(this,$1,yylineno);
                                                            }
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

funcionDibujarTs    :   IDENTACION DIBUJAR_TS '('')'    {$$ = new DrawTS(-1,-1,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

funcionDibujarExp   :   IDENTACION DIBUJAR_EXP '(' exprecion ')'    {$$ = new DrawEXP($4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

funcionDibujarAST   :   IDENTACION DIBUJAR_AST '(' ID ')'   {$$ = new DrawAST($4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

funcionMostrar  :   IDENTACION MOSTRAR '(' exprecion ',' parametrosEnviar ')'   {
                                                                                    $$ = new Mostrar($4,$6,@2.first_line,@2.first_column);
                                                                                    agregarScope2($1,$$);
                                                                                    addSimpleInst($$);
                                                                                    OBJ_MOSTRAR.push($$);
                                                                                }
                |   IDENTACION MOSTRAR '(' exprecion ')'    {
                                                                $$ = new Mostrar($4,[],@2.first_line,@2.first_column);
                                                                agregarScope2($1,$$);
                                                                addSimpleInst($$);
                                                                OBJ_MOSTRAR.push($$);
                                                            }
                ;

sentenciaContinuar  :   IDENTACION CONTINUAR    {$$ = new Continuar(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

sentenciaDetener    :   IDENTACION DETENER  {$$ = new Detener(@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

sentenciaMientras   :   IDENTACION MIENTRAS '(' exprecion ')' ':'   {   
                                                                        $$ = new Mientras($4,generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));
                                                                        agregarScope2($1,$$);
                                                                        addIntruccionMientrasPara($$);
                                                                    }
                    ;

sentenciaPara   :   IDENTACION PARA '('INT ID '=' exprecion ';' exprecion ';' opPara ')' ':'    {
                                                                                                    $$ = new Para($5,$7,$9,$11,generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));
                                                                                                    let varPara = new Declaracion($5,Tipo.INT,$7,@5.first_line,(@5.first_column+1));
                                                                                                    $$.getSentencias().agregarVarsPrecedencia(varPara);
                                                                                                    agregarScope2($1,$$);
                                                                                                    addIntruccionMientrasPara($$);
                                                                                                }
                ;

opPara  :   '++'    {$$ = 0;}
        |   '--'    {$$ = 1;}
        ;

sentenciaSi :   IDENTACION SI '(' exprecion ')' ':' {
                                                        $$ = new Si($4,generarSentencias(@2.first_line,(@2.first_column+1)),null,@2.first_line,(@2.first_column+1));                                                        
                                                        agregarScope2($1,$$);
                                                        addInstruccionSi($$);
                                                    }
            |   IDENTACION SINO ':'                 {
                                                        $$ = new Sino(generarSentencias(@2.first_line,(@2.first_column+1)),@2.first_line,(@2.first_column+1));
                                                        agregarScope2($1,$$);
                                                        addInstruccionSi($$);
                                                    }
            ;

instruccionRetorno  :   IDENTACION RETORNO exprecion    {$$ = new Retornar($3,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

llamarFuncion   :   IDENTACION ID '(' parametrosEnviar ')'  {$$ = new CallFuncion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                |   IDENTACION ID '(' ')'   {$$ = new CallFuncion($2,[],@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                ;

parametrosEnviar    :   parametrosEnviar ',' exprecion  {$1.push($3);$$=$1;}
                    |   exprecion   {$$=[$1];}
                    ;

instruccionFuncionMetodo    :   tipoDato ID '(' parametros ')' ':'  {
                                                                        $$ = new Funcion($1,$2,generarSentencias(@2.first_line,(@2.first_column+1)),$4,@2.first_line,(@2.first_column+1));
                                                                        verificarExistenciaFuncion($$);
                                                                        $$.getSentencias().agregarVarsPrecedencia($4);
                                                                        agregadoFuncion($$);
                                                                    }
                            |   tipoDato ID '(' ')' ':' {
                                                            $$ = new Funcion($1,$2,generarSentencias(@2.first_line,(@2.first_column+1)),[],@2.first_line,(@2.first_column+1));
                                                            verificarExistenciaFuncion($$);
                                                            agregadoFuncion($$);
                                                        }
                            ;

parametros  :   parametros ',' tipoDato ID  {
                                                let tmpD = new Declaracion($4,$3,null,@4.first_line,(@4.first_column+1));
                                                verificarVarFuncion($1,tmpD);
                                                $1.push(tmpD);
                                                $$ = $1;
                                            }
            |   tipoDato ID {
                                $$=[new Declaracion($2,$1,null,@2.first_line,(@2.first_column+1))];
                            }
            ;

instruccionAsignar  :   ID '=' exprecion                {$$ = new Asignacion($1,$3,@1.first_line,(@1.first_column+1));agregarScope2("",$$);addSimpleInst($$);}
                    |   IDENTACION ID '=' exprecion     {$$ = new Asignacion($2,$4,@2.first_line,(@2.first_column+1));agregarScope2($1,$$);addSimpleInst($$);}
                    ;

instruccionDeclarar :   IDENTACION tipoDato listaIds    {
                                                            $$ = $3;
                                                            verificarTipoVariable($2,$$)
                                                            agregarTipoDeclaracion($2,$$,$1);
                                                            agregarScope2Declaraciones($1,$$);
                                                            addSimpleInst($$);
                                                        }
                    |   IDENTACION tipoDato listaIds '=' exprecion  {
                                                                        $$ = $3;
                                                                        verificarTipoVariable($2,$$)
                                                                        agregarTipoDeclaracion($2,$$,$1);
                                                                        agregarValorDeclaracion($$,$5);
                                                                        agregarScope2Declaraciones($1,$$);
                                                                        addSimpleInst($$);
                                                                    }
                    |   tipoDato listaIds               {
                                                            $$ = $2;
                                                            verificarTipoVariable($1,$$)
                                                            agregarTipoDeclaracion($1,$$,"");
                                                            agregarScope2Declaraciones("",$$);
                                                            addSimpleInst($$);
                                                        }
                    |   tipoDato listaIds '=' exprecion {
                                                            $$ = $2;
                                                            verificarTipoVariable($1,$$)
                                                            agregarTipoDeclaracion($1,$$,"");
                                                            agregarValorDeclaracion($$,$4);
                                                            agregarScope2Declaraciones("",$$);
                                                            addSimpleInst($$);
                                                        }
                    
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
            |   ID                              {
                                                    $$ = [new Declaracion($1,-1,null,@1.first_line,(@1.first_column+1))];
                                                }
            ;


exprecion   :   '-' exprecion %prec UMINUS  {
                                                //console.log("- uninus"); 
                                                $$ = new Operacion(new Literal("-1",@1.first_line, (@1.first_column+1),3),$2,2,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '+' exprecion     {
                                                //console.log("+");
                                                $$ = new Operacion($1,$3,0,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '-' exprecion     {
                                                //console.log("-");
                                                $$ = new Operacion($1,$3,1,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '/' exprecion     {   
                                                //console.log("/");
                                                $$ = new Operacion($1,$3,3,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '^' exprecion     {
                                                //console.log("^");
                                                $$ = new Operacion($1,$3,5,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '*' exprecion     {
                                                //console.log("*");
                                                $$ = new Operacion($1,$3,2,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '%' exprecion     {
                                                //console.log("%");
                                                $$ = new Operacion($1,$3,4,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '>' exprecion     {
                                                //console.log(">");
                                                $$ = new Relacional($1,$3,3,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '<' exprecion     {
                                                //console.log("<");
                                                $$ = new Relacional($1,$3,2,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '>=' exprecion    {
                                                //console.log(">=");
                                                $$ = new Relacional($1,$3,5,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '<=' exprecion    {
                                                //console.log("<=");
                                                $$ = new Relacional($1,$3,4,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '!=' exprecion    {
                                                //console.log("!=");
                                                $$ = new Relacional($1,$3,1,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '==' exprecion    {
                                                //console.log("==");
                                                $$ = new Relacional($1,$3,0,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '~' exprecion     {
                                                //console.log("~");
                                                $$ = new Relacional($1,$3,6,INCERTEZA_GLOBAL,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '||' exprecion    {
                                                //console.log("||");
                                                $$ = new Logica($1,$3,1,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '|&' exprecion    {
                                                //console.log("|&");
                                                $$ = new Logica($1,$3,2,@1.first_line, (@1.first_column+1));
                                            }
            |   exprecion '&&' exprecion    {   
                                                //console.log("&&");
                                                $$ = new Logica($1,$3,0,@1.first_line, (@1.first_column+1));
                                            }
            |   '!' exprecion               {
                                                //console.log("!");
                                                $$ = new Logica($1,$3,3,@1.first_line, (@1.first_column+1));
                                            }
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