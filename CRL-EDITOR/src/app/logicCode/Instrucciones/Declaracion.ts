import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { TipoString } from "../Abstracto/Retorno";
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
            if(val.tipo == this.tipo){
                scope.declararVariable(this.id,val.value,val.tipo,this.linea,this.columna);
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