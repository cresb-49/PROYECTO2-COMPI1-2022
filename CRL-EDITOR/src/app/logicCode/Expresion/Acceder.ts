import { runInThisContext } from "vm";
import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Acceder extends Exprecion{

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const recuperacion = scope.obtenerVariable(this.id);
        if(recuperacion==null){
            throw new Error("La variable \""+this.id+"\" no existe, Linea: "+this.linea+" ,Columna: "+this.columna);
        }
        return {value: recuperacion.valor,tipo:recuperacion.tipo}
    }
}