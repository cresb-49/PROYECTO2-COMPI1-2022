/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
text ([^\s])+((\s)+([^\s]+))*
%%

\s+                   /* skip whitespace */
{text}                return 'CADENA'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */


%start expressions

%% /* language grammar */

expressions : CADENA EOF {console.log($1);return $1;};