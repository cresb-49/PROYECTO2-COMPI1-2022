/* description: Parses end executes mathematical expressions. */

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

expressions : str EOF   {console.log($1);}
            ;
str : str TEXT  {$$=$1;$$.push($2);}
    | str KEY   {$$=$1;$$.push($2);}
    | KEY   {$$=[$1];}
    | TEXT  {$$=[$1];}
    ;