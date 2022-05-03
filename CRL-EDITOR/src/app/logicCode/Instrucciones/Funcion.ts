import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Asignacion } from "./Asignacion";
import { Declaracion } from "./Declaracion";

import { Sentencias } from "./Sentencias";

export class Funcion extends Instruccion implements AsigInstrucciones{

    private localScope:Scope|null = null;
      
    constructor(private tipo:number,private id: string, private sentencias:Sentencias|null, private parametros : Array<Declaracion>, liena : number, columna : number){
        super(liena,columna);
        this.setScope2(0);
    }
    
    public ejecutar(scope: Scope):Retorno {
        if(scope == null){
            for (const param of this.parametros) {
                param.ejecutar(scope);
            }
            const result = this.sentencias?.ejecutar(scope);
            if(result.tipo == this.tipo){
                return {value:result.valor,tipo:result.tipo};
            }else{
                throw new Error("El valor de retorno no coincide con la funcion");
            }
        }else{
            throw new Error("No esta inicializada la funcion!!!!");
        }
    }

    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }

    public ejecutarFuncion(valParametros:Exprecion[],scope:Scope):Retorno{
        if(valParametros.length == this.parametros.length){
            this.localScope = new Scope(scope);
            for (let index = 0; index < valParametros.length; index++) {
                const element = new Asignacion(this.parametros[index].getId(),valParametros[index],this.linea,this.columna);
                element.ejecutar(this.localScope);
            }
            return this.ejecutar(this.localScope);
        }else{
            throw new Error("La funcion solo tiene declarada "+this.parametros.length+" parametros");
        }
    }

    public getId():string{
        return this.id;
    }

    public getSentencias():Sentencias|null{
        return this.sentencias;
    }

    public getTipo(){
        return this.tipo;
    }
}