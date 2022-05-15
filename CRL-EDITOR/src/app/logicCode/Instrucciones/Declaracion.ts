import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo, TipoString } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Declaracion extends Instruccion{
    
    private id : string;
    private valor : Exprecion;
    private tipo:number;

    constructor(id:string,tipo:number,valor: Exprecion, linea : number, columna: number){
        super(linea, columna);
        this.id = id;
        this.valor = valor;
        this.tipo=tipo;
    }
    
    public setTipo(tipo:number){
        this.tipo=tipo;
    }
    
    public ejecutar(scope: Scope) {
        if(this.valor == null){
            scope.declararVariable(this.id,null,this.tipo,this.linea,this.columna);
        }else{
            const val = this.valor.ejecutar(scope);
            let tipo = tablaAsignacion[this.tipo][val.tipo];
            if(tipo !=Tipo.ERROR){
                if(this.tipo == tipo){
                    const valFinal = this.resultAsignacion(this.tipo,val.tipo,val.value);
                    scope.declararVariable(this.id,valFinal,tipo,this.linea,this.columna);
                }else{
                    throw new Error("El valor a asignar es de tipo: "+TipoString[val.tipo]);
                }
            }else{
                throw new Error("El valor a asignar es de tipo: "+TipoString[val.tipo]);
            }
        }
    }
    
    public getId():string{
        return this.id;
    }

    public getTipo():number{
        return this.tipo;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo-" + subNameNode + "-" + nume;
        let decl = node + '[label = "<n>Declaracion"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }

    private resultAsignacion(tipoVar:number,tipoAsig:number,valor:any):any{
        switch (tipoVar) {
            case Tipo.DOUBLE:
                if(tipoAsig == Tipo.CHAR){
                    return this.getCharNumeric(valor);
                }else if(tipoAsig == Tipo.BOOLEAN){
                    return this.getBooleanNumeric(valor);
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
                    return String(this.getBooleanNumeric(valor));
                }else if(tipoAsig == Tipo.INT){
                    return String(valor);
                }else if(tipoAsig == Tipo.DOUBLE){
                    return String(valor);
                }
                return valor;
            case Tipo.INT:
                if(tipoAsig == Tipo.CHAR){
                    return this.getCharNumeric(valor);
                }else if(tipoAsig == Tipo.BOOLEAN){
                    return this.getBooleanNumeric(valor);
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
    private getBooleanNumeric(state: boolean) {
        if (state) {
            return 1;
        }
        else {
            return 0;
        }
    }
    private getCharNumeric(caracter: String) {
        return caracter.charCodeAt(0);
    }
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