import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";


export class ObtenerValFuncion extends Exprecion{

    constructor(private id:string,private parametros:Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope): Retorno {
        //TODO:realizar la logica para la llamada de retorno de funciones
        return{value:0,tipo:Tipo.ERROR};
    }

}