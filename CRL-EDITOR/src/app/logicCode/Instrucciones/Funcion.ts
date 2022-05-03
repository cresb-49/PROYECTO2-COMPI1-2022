import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Asignacion } from "./Asignacion";
import { Declaracion } from "./Declaracion";

import { Sentencias } from "./Sentencias";

export class Funcion extends Instruccion implements AsigInstrucciones{

    private funcionesAccesible: Map<string,Funcion>;
    private viewScope:Scope;
      
    constructor(private tipo:number,private id: string, private sentencias:Sentencias|null, private parametros : Array<Declaracion>, liena : number, columna : number){
        super(liena,columna);
        this.setScope2(0);
    }
    
    public ejecutar(scope: Scope):Retorno {
        if(scope != null){
            const result = this.sentencias?.ejecutarPara(scope);
            if(result != undefined){
                if(result.tipo == this.tipo){
                    return {value:result.valor,tipo:result.tipo};
                }else{
                    throw new Error("El valor de retorno no coincide con la funcion");
                }
            }else{
                return {value:null,tipo:Tipo.ERROR};
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

            let newScope = new Scope(null);
            newScope.setMapFunciones(this.funcionesAccesible);
            this.viewScope = newScope;

            for (const vari of this.parametros) {
                vari.ejecutar(newScope);
            }

            for (let index = 0; index < valParametros.length; index++) {
                const element = new Asignacion(this.parametros[index].getId(),valParametros[index],this.linea,this.columna);
                element.ejecutarDiferido(newScope,scope);
            }

            return this.ejecutar(newScope);
        }else{
            throw new Error("La funcion tiene declarada: "+this.parametros.length+" parametros y esta enviando "+valParametros.length);
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

    public setRefFuncion(mapFun:Map<string,Funcion>){
        this.funcionesAccesible = mapFun;
    }
}