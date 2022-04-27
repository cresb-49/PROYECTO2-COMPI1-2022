%lex
number [0-9]+       //Exprecion para la repecentacion de numeros
decimal {number}"." {number}
string (\"[^"]*\")
identificador ([a-zA-Z_$][a-zA-Z\\d_$]*)
%%

{number}        return 'ENTERO'
{decimal}       return 'DECIMAL'
{string}        return 'STRING'


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

Init : instrucciones EOF;

instrucciones 
    :   instrucciones intruccion{

    }
    |   intruccion{
        
    }
;

intruccion
    :   InsMostrar  {
        $$ = $1;
    }
    |   InsFuncion{
        $$ = $1;
    }
    |   InsPrincipal{
        $$ = $1;
    }
    |   InsLlamar{
        $$ = $1;
    }
    |   InsRetorno{
        $$ = $1;
    }
    |   InsSi{
        $$ = $1;
    }
    |   InsPara{
        $$ = $1;
    }
    |   InsMientras{
        $$ = $1;
    }
    |   DIBUJAR_AST{
        $$ = $1;
    }
    |   DrawExp{
        $$ = $1;
    }
    |   DIBUJAR_TS{
        $$ = $1;
    }
    |   error
;

intruccionEspecialCiclo
    :   DETENER
    :   CONTINUAR
;

InsMostrar
    :   MOSTRAR '(' Exp ')'{
        console.log("Intruccion Mostrar");
    }
;

InsFuncion
    :   TipoDatoFuncion ID '(' ')' ':'{
        console.log("Declaracion de Funcion");
    }
;

InsPrincipal
    :   VOID PRINCIPAL '(' ')' ':'{

    }
;

InsLlamar
    :   ID '(' ')'{

    }
;

InsRetorno
    :   RETORNO{

    }
;

InsSi
    :   SI '(' Exp ')' ':'{
        console.log("Instruccion Si");
    }
    |   SINO ':'{
        console.log("Instruccion Si");
    }
;

InsPara
    :   PARA '(' INT ID '=' Exp ';' Exp ; Op ')' ':'{

    }
;

Op
    :   '++'{

    }
    |   '--'{

    }
;

InsMientras
    :   MIENTRAS '(' Exp ')' ':'{

    }
;

DrawExp
    :   DIBUJAR_EXP '(' ')'
;

TipoDato
    :   INT{
        $$ = $1;
    }
    |   STRING{
        $$ = $1;
    }
    |   CHAR{
        $$ = $1;
    }
    |   DOUBLE{
        $$ = $1;
    }
    |   BOOLEAN{
        $$ = $1;
    }
;

TipoDatoFuncion
    :   VOID{
        $$ = $1;
    }
    |   TipoDato{
        $$ = $1;
    }
;

Exp
    :   ENTERO{
        $$ = $1;
    }
    |   DECIMAL{
        $$ = $1;
    }
    |   TRUE{
        $$ = $1;
    }
    |   FALSE{
        $$ = $1;
    }
    |   ID{
        $$ = $1;
    }
;