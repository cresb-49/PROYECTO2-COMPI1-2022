import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo, TipoString } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Declaracion extends Instruccion{
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        throw new Error("Method not implemented.");
    }

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
                    scope.declararVariable(this.id,val.value,tipo,this.linea,this.columna);
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
}

export const tablaAsignacion =[
            /*  DOUBLE      BOOLEAN     STRING        INT         CHAR       VOID      ERROR*/
/*DOUBLE*/  [Tipo.DOUBLE ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.DOUBLE ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR],
/*BOOLEAN*/ [Tipo.ERROR  ,Tipo.BOOLEAN,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR],
/*STRING*/  [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.STRING ,Tipo.ERROR  ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR],
/*INT*/     [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.INT    ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR],
/*CHAR*/    [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.CHAR ,Tipo.ERROR,Tipo.ERROR],
/*VOID*/    [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR],
/*ERROR*/   [Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR  ,Tipo.ERROR,Tipo.ERROR,Tipo.ERROR]
];