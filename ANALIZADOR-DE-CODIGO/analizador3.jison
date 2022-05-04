
%lex
text ([^\s])+((\s)+([^\s]+))*
%%

[\s\t]+               return 'ESPACIOS'
{text}                return 'CADENA'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */


%start expressions

%% /* language grammar */

expressions : TEXT EOF {console.log($1);return $1;};