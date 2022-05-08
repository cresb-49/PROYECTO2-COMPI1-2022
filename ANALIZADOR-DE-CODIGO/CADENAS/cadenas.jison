%{
    const {Key,Text}= require ('./../Mostrar/RemplazoCadena.ts');
%}

/* lexical grammar */
%lex
key     '{'([0-9]+)'}'
%%

\s+                 return 'TEXT'
{key}               return 'KEY'
<<EOF>>             return 'EOF'
.                   return 'TEXT'

/lex

/* operator associations and precedence */


%start expressions

%% /* language grammar */

expressions : str EOF   {return $1;}
            ;
str : str TEXT  {$$=$1;$$.push(new Text($2));}
    | str KEY   {$$=$1;$$.push(new Key($2));}
    | KEY   {$$=[new Key($1)];}
    | TEXT  {$$=[new Text($1)];}
    ;