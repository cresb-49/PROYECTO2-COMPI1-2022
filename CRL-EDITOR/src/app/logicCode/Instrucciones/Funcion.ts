import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
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
            // console.log("Verificacion Funcion");
            // console.log(result);
            if((result == undefined) && (this.tipo == Tipo.VOID)){
                return {value:null,tipo:Tipo.ERROR};
            }else{
                if(result != undefined){
                    if(result.tipo == this.tipo){
                        return {value:result.value,tipo:result.tipo};
                    }else{
                        throw new Error("El valor de retorno no coincide con la funcion -> sub origen Linea: "+this.linea+" ,Columna: "+this.columna);
                    }
                }else{
                    throw new Error("La funcion debe retornar valor \""+TipoString[this.tipo]+"\" -> sub origen Linea: "+this.linea+" ,Columna: "+this.columna);
                }
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

            try {
                for (let index = 0; index < valParametros.length; index++) {
                    const element = new Asignacion(this.parametros[index].getId(),valParametros[index],valParametros[index].linea,valParametros[index].columna);
                    element.ejecutarDiferido(newScope,scope);
                }
            } catch (error) {
                if(error instanceof Error){
                    throw new Error("-> sub derivacion -> Linea: "+this.linea+" ,Columna: "+this.columna+" "+error.message);
                }
            }
            return this.ejecutar(newScope);
        }else{
            throw new Error("La funcion tiene declarada: "+this.parametros.length+" parametros y esta enviando "+valParametros.length+"-> sub derivacion -> Linea: "+this.linea+" ,Columna: "+this.columna);
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