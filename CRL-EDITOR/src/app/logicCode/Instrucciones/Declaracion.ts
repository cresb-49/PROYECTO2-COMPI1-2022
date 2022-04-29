import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Declaracion extends Instruccion{

    private id : string;
    private valor : Exprecion;

    constructor(id: string, valor : Exprecion, linea : number, columna: number){
        super(linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public ejecutar(scope: Scope) {
        if(this.valor==null){
            scope.guardar(this.id, this.valor,Tipo.ERROR);
        }else{
            const val = this.valor.ejecutar(scope);
            scope.guardar(this.id, val.value, val.tipo);
        }
    }

}