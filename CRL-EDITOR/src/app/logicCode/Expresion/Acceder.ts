import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Acceso extends Exprecion{

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const valor = scope.obtenerVariable(this.id);
        if(valor==null){
            throw new Error("La variable no existe");
        }
        return {value: valor.valor,tipo:valor.tipo}
    }
}