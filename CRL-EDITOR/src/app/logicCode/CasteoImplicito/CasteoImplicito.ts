import { Tipo } from "../Abstracto/Retorno";

export function CAST_IMPLICITO(tipoVar:number,tipoAsig:number,valor:any):any{
    switch (tipoVar) {
        case Tipo.DOUBLE:
            if(tipoAsig == Tipo.CHAR){
                return GET_CHAR_NUMERIC(valor);
            }else if(tipoAsig == Tipo.BOOLEAN){
                return GET_BOOLEAN_NUMERIC(valor);
            }else if(tipoAsig == Tipo.INT){
                return valor
            }else if(tipoAsig == Tipo.DOUBLE){
                return valor;
            }
            break;
        case Tipo.BOOLEAN:
            return valor;
        case Tipo.STRING:
            if(tipoAsig == Tipo.CHAR){
                return String(valor);
            }else if(tipoAsig == Tipo.BOOLEAN){
                return String(GET_BOOLEAN_NUMERIC(valor));
            }else if(tipoAsig == Tipo.INT){
                return String(valor);
            }else if(tipoAsig == Tipo.DOUBLE){
                return String(valor);
            }
            return valor;
        case Tipo.INT:
            if(tipoAsig == Tipo.CHAR){
                return GET_CHAR_NUMERIC(valor);
            }else if(tipoAsig == Tipo.BOOLEAN){
                return GET_BOOLEAN_NUMERIC(valor);
            }else if(tipoAsig == Tipo.INT){
                return valor;
            }else if(tipoAsig == Tipo.DOUBLE){
                return Math.trunc(valor);
            }
            break;
        case Tipo.CHAR:
            if(tipoAsig == Tipo.INT){
                return String.fromCharCode(valor);
            }
            return valor;
    }
}

export function GET_BOOLEAN_NUMERIC(state: boolean) {
    if (state) {
        return 1;
    }
    else {
        return 0;
    }
}

export function GET_CHAR_NUMERIC(caracter: String) {
    return caracter.charCodeAt(0);
}

export const tablaAsignacion =[
    /*  DOUBLE      BOOLEAN     STRING        INT         CHAR       VOID      ERROR*/
/*DOUBLE*/  [Tipo.DOUBLE ,Tipo.DOUBLE ,Tipo.ERROR  ,Tipo.DOUBLE ,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
/*BOOLEAN*/ [Tipo.ERROR  ,Tipo.BOOLEAN,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
/*STRING*/  [Tipo.STRING ,Tipo.STRING ,Tipo.STRING ,Tipo.STRING ,Tipo.STRING,Tipo.ERROR,Tipo.ERROR],
/*INT*/     [Tipo.INT    ,Tipo.INT    ,Tipo.ERROR  ,Tipo.INT    ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
/*CHAR*/    [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.CHAR   ,Tipo.CHAR  ,Tipo.ERROR,Tipo.ERROR],
/*VOID*/    [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
/*ERROR*/   [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];