import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Retornar extends Instruccion {
    private exprecion:Exprecion;
    constructor(exprecion:Exprecion,linea:number,columna:number) {
        super(linea,columna);
        this.exprecion = exprecion;
    }

    public ejecutar(scope: Scope):Retorno {
        const valor = this.exprecion.ejecutar(scope);
        return {value:valor.value,tipo:valor.tipo};
    }
}