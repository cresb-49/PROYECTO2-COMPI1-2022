import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Funcion extends Instruccion{
    private id:string;
    private instrucciones:Instruccion;
    public parametros:Array<string>;
    
    constructor(id: string, instrucciones:Instruccion, parametros : Array<string>, liena : number, columna : number){
        super(liena,columna);
        this.id = id;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }

    public ejecutar(scope: Scope) {
        scope.guardarFuncion(this.id,this);
    }
}