import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class CallFuncion extends Instruccion{

    constructor(private id:string,private parametros:Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        const funcion = scope.obtenerFuncion(this.id);
        if(funcion == undefined){
            throw new Error("No existe la funcion \""+this.id+"\" en el programa ,Linea: "+this.linea+" ,Columna: "+this.columna);
        }else{
            try {
                funcion.ejecutarFuncion(this.parametros,scope);
            } catch (error) {
                if(error instanceof Error){
                    throw new Error("Error en ejecucion de funcion ,Linea: "+this.linea+" ,Columna: "+this.columna+" "+error.message);
                }
            }
        }
    }
}