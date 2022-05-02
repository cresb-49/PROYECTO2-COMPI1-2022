import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Declaracion } from "./Declaracion";
import { Sentencias } from "./Sentencias";

export class Funcion extends Instruccion implements AsigInstrucciones{
      
    constructor(private tipo:number,private id: string, private sentencias:Sentencias|null, private parametros : Array<Declaracion>, liena : number, columna : number){
        super(liena,columna);
        this.setScope2(0);
    }
    
    public ejecutar(scope: Scope):Retorno {
        //TODO:Realizar la logia del ejecutar de una funcion

        //scope.guardarFuncion(this.id,this);
        return {value:0,tipo:this.tipo};
    }

    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }

    public getId():string{
        return this.id;
    }

    public getSentencias():Sentencias|null{
        return this.sentencias;
    }
}