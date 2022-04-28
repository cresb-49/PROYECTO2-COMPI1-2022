import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
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
        const val = this.valor.ejecutar(scope);
        scope.guardar(this.id, val.value, val.tipo);
    }

}