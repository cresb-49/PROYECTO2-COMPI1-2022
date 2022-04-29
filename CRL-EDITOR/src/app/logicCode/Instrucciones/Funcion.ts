import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Declaracion } from "./Declaracion";

export class Funcion extends Instruccion{
    private tipo:number;
    private id:string;
    private instrucciones:Instruccion|null;
    public parametros:Array<Declaracion>;
    
    constructor(tipo:number,id: string, instrucciones:Instruccion|null, parametros : Array<Declaracion>, liena : number, columna : number){
        super(liena,columna);
        this.tipo = tipo;
        this.id = id;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }

    public ejecutar(scope: Scope):Retorno {
        //TODO:Realizar la logia del ejecutar de una funcion
        
        
        
        
        //scope.guardarFuncion(this.id,this);
        return {value:0,tipo:this.tipo};
    }
}